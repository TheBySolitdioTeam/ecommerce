export default function ProductRootClient() {
    return (
      <div className="drawer lg:drawer-open m-5">
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
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <h2 className="menu-title">Type</h2>
              <ul>
                <li>
                  <a>Product</a>
                </li>
                <li>
                  <a>Clothing</a>
                </li>
                <li>
                  <a>Furnitures</a>
                </li>
              </ul>
            </li>
          </ul>
         
        </div>
      </div>
    )
}