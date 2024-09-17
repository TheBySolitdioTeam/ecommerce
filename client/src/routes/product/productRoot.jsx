import {Form, useSubmit, Outlet} from 'react-router-dom'
import AllCategoriesVertical from '../../components/allCategoriesVertical'
export default function ProductRootClient() {
    const submit = useSubmit()
    return (
      <div className="flex flex-col lg:flex-row">
        <div className="drawer lg:drawer-open m-5 w-96">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-start justify-start mx-5">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-sm btn-primary drawer-button lg:hidden"
            >
              Filter
            </label>
          </div>
          <div className="drawer-side z-40">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <li>
                <h2 className="menu-title">Type</h2>
                <ul>
                  <Form method="get" action="/product/type">
                    <li className="flex flex-row">
                      <a>
                        <input
                          type="radio"
                          name="name"
                          className="radio checked:bg-blue-500"
                          value={'Product'}
                          defaultChecked
                          onChange={(e) => {
                            e.target.checked ? submit(e.currentTarget.form) : ''
                          }}
                        />
                        Product
                      </a>
                    </li>
                    <li>
                      <a>
                        <input
                          type="radio"
                          name="name"
                          className="radio checked:bg-blue-500"
                          value={'clothing'}
                          onChange={(e) => {
                            e.target.checked ? submit(e.currentTarget.form) : ''
                          }}
                        />
                        Clothing
                      </a>
                    </li>
                    <li>
                      <a>
                        <input
                          type="radio"
                          name="name"
                          className="radio checked:bg-blue-500"
                          value={'furniture'}
                          onChange={(e) => {
                            e.target.checked ? submit(e.currentTarget.form) : ''
                          }}
                        />
                        Furnitures
                      </a>
                    </li>
                  </Form>

                </ul>
              </li>
              <AllCategoriesVertical/>
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    )
}