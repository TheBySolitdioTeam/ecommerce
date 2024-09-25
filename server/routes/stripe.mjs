import express, { Router } from 'express'
import Stripe from 'stripe'
import Cart from '../models/cart.mjs'
import Addresses from '../models/addresses.mjs'
import Order from '../models/orders.mjs'
const router = Router()
const checkIfConnected = (req, res, next) => {
  req.user ? next() : res.send({ error: 'Your are not an connected!' })
}


// Instantiate Stripe
const stripe = new Stripe(
  'sk_test_51JQRmnCrM5sxvtxSt7zHS5RPOKLEhpB6vGRP1euFkdfijCBRudxQAnim2kbcYdv5t4PWWG0g759vciX19zdh8Wct00c8yyAi2w'
)

// Calculate amount for items
const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  const total = items
    .map((item) => parseFloat(item.price * parseFloat(item.qty)))
    .reduce((acc, curr) => (acc += curr), 0)
  return total
}

router.use(express.json())
router.post('/create-payment-intent',checkIfConnected, async (req, res) => {
  const { addressId } = req.query
 
  // Get items
  try {
        
    // get the order ready
    const address = await Addresses.findById(addressId)
    if (!address) return res.send({ error: 'Wrong Address' })
     //console.log(address)
    // Get the user
    const user = {
      user_id: req.user.id,
      email: req.user.email
    }
    



        
        const cart = await Cart.find({ user_id: req.user.id })
    const items = cart[0].items
    const total = calculateOrderAmount(items)
    const order = { cart:JSON.stringify(cart), address:JSON.stringify(address), user:JSON.stringify(user), total: total.toString() }
   // console.log(order)
        if(items.length <= 0) return res.send({error: 'No cart items found'})
        //console.log(calculateOrderAmount(items))
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(total*100),
        currency: 'usd',
        metadata: order,
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      })

      res.send({
        clientSecret: paymentIntent.client_secret,
        // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
      })
    } catch (error) {
      return res.send({ error: error.message })
    }

  
})

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_b384298fb0f0a0fd76adfa889a6ef378b9bf45689ba3d4726438962549823d32";

router.use(express.json())
router.post('/webhook', (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)
    console.log(event.type)
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data
        console.log(event.data)
        // Then define and call a function to handle the event payment_intent.succeeded
        handlePaymentIntentSucceeded(paymentIntentSucceeded)
        function handlePaymentIntentSucceeded(payment_intent) {
          console.log(payment_intent)

          const orderObj = {
          cart: JSON.parse(payment_intent.metadata.cart),
          user: JSON.parse(payment_intent.metadata.user),
          address: JSON.parse(payment_intent.metadata.address),
          total: payment_intent.metadata.total,
          payment: payment_intent.object.id
        }
        console.log(orderObj);
        const order = new Order(orderObj)
        try {
            order
              .save()
              .then((res) => res.json())
              .then((data) => console.log(data))
        } catch (error) {
          response.status(500).send({ error: error.message })
        }

          //return order
        }

        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send()
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  
});



export default router
