import { useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { FaStripeS } from 'react-icons/fa6'
export async function loader() {
    try {
        const response = await fetch(`http://localhost:5500/cart/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const cart = await response.json()
        return cart
    } catch (error) {
        return {error: error.message}
    }
}

export default function Checkout() {
    const cart = useLoaderData()[0]
    console.log(cart)
    const navigate = useNavigate()
    useEffect(() => {
        if (cart.items.length <= 0) {
            navigate(-1)
        }
    },[cart])
    return (
      <div className="flex flex-col justify-center items-center lg:flex-row">
        {cart.items ? (
          <>
            <div className="card p-5 m-5 bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
              <table className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Qty</td>
                    <td>Price</td>
                    <td>Sub</td>
                    <td>Size</td>
                  </tr>
                </thead>
                <tbody>
                  {cart.items
                    ? cart.items.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img
                                    src={
                                      'http://localhost:5500/products/' +
                                      item.image
                                    }
                                    alt="Product Image"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td>{item.qty}</td>

                          <td>
                            {' '}
                            $
                            {parseFloat(
                              item.price.$numberDecimal || item.price
                            ).toFixed()}
                          </td>
                          <td>
                            {' '}
                            $
                            {parseFloat(
                              item.price.$numberDecimal * item.qty ||
                                item.price * item.qty
                            ).toFixed()}
                          </td>
                          <td> {item.size ? item.size : 'None'} </td>
                        </tr>
                      ))
                    : ''}
                </tbody>
              </table>
              <span className="font-semibold text-xl">
                Subtotal: $
                {cart.items
                  ? parseFloat(cart.subtotal.$numberDecimal).toFixed(2)
                  : 0}{' '}
              </span>
            </div>
            <div className="card p-5 m-5 bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
              <button className="btn w-full btn-primary">
                <FaStripeS /> Pay with Stripe
              </button>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    )
}