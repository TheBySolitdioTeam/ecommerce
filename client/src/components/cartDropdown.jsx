/* eslint-disable react/prop-types */
import { useFetcher } from 'react-router-dom'
import { FaCartShopping, FaX } from 'react-icons/fa6'
export default function CartDropdown({ cart }) {
    const fetcher = useFetcher()
    //const submit = useSubmit()
    return (
      <details className="dropdown dropdown-hover dropdown-end">
        <summary>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle m-2">
            <div className="indicator">
              <FaCartShopping className="text-xl" />
              <span className="badge badge-sm bg-primary text-white indicator-item">
                {cart.items ? cart.items.length : 0}
              </span>
            </div>
          </div>
        </summary>
        <div
          tabIndex={0}
          className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-108 shadow"
        >
          <div className="card-body">
            <span className="text-lg font-bold">
              {' '}
              {cart.items ? cart.items.length : 0} Items
            </span>
            <div className="overflow-x-auto">
              <table className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Qty</td>
                    <td>Price</td>
                    <td>Sub</td>
                    <td>Del</td>
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
                          <td>
                            <fetcher.Form
                              method="post"
                              action={'/product/changeQty'}
                            >
                              <input
                                type="hidden"
                                value={item.id}
                                name="itemId"
                              />
                              <input
                                type="hidden"
                                value={cart._id}
                                name="cartId"
                              />
                              <input
                                className="input input-bordered input-xs"
                                type="number"
                                step="1"
                                min="1"
                                max="10"
                                name="qty"
                                defaultValue={item.qty}
                                onChange={(e) => {
                                  fetcher.submit(e.currentTarget.form)
                                }}
                              />
                            </fetcher.Form>
                          </td>

                          <td>
                            {' '}
                            $
                            {
                              parseFloat(
                                item.price.$numberDecimal || item.price
                              ).toFixed()
                            }
                          </td>
                          <td>
                            {' '}
                            $
                            {fetcher.state !== 'idle' ? (
                              <span className="loading loading-infinity loading-md"></span>
                            ) : (
                              parseFloat(
                                item.price.$numberDecimal * item.qty ||
                                  item.price * item.qty
                              ).toFixed()
                            )}{' '}
                          </td>
                          <td>
                            <fetcher.Form
                              method="post"
                              action={`/product/deleteCartItem/${cart._id}`}
                            >
                              <input
                                type="hidden"
                                value={item.id}
                                name="itemId"
                              />
                              <button
                                className="btn btn-sm btn-error"
                                type="submit"
                              >
                                {fetcher.state === 'submitting' ? (
                                  <span className="loading loading-infinity loading-md"></span>
                                ) : (
                                  <FaX />
                                )}
                              </button>
                            </fetcher.Form>
                          </td>
                        </tr>
                      ))
                    : ''}
                </tbody>
              </table>
            </div>
            <span className="font-semibold text-xl">
              Subtotal: ${cart.items ? parseFloat(cart.subtotal.$numberDecimal).toFixed(2) : 0}{' '}
            </span>
            <div className="card-actions">
              <button className="btn btn-primary btn-block">
                {' '}
                {fetcher.state !== 'idle' ? (
                  <span className="loading loading-infinity loading-md"></span>
                ) : (
                  'Checkout'
                )}{' '}
              </button>
            </div>
          </div>
        </div>
      </details>
    )
}