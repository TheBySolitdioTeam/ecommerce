import mongoose, { Schema } from 'mongoose'

import userSubDoc from './subdocs/userSubDoc.mjs'
const cartSubDoc = new Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Please provide a user_id'],
  },
  items: {
    type: Array,
    required: [true, 'Cart cannot be empty']
  },
  subtotal: {
    type: mongoose.Types.Decimal128,
    required: [true, 'The subtotal is required!']
  },
})





const orderSchema = new Schema({
    cart: {
        type: cartSubDoc,
        required: [true, 'Please provide a cart!']
        
     },
    total: {
        type: mongoose.Decimal128,
        required: [true, 'Please provide a total price for the order!']
    },
    status: {
        type: String,
        default: 'Order Received'
    },
    user: userSubDoc,
    payment: mongoose.Mixed,
    address: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide an address']
    }

})


export default mongoose.model('Orders', orderSchema)