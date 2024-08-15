import { FaChartArea, FaStore, FaTable, FaBars } from 'react-icons/fa6'

export default function AdminHeader() {
    return (
      <div className="navbar bg-base-100 px-2  lg:px-10">
        <div className="flex-none">
          <div className="drawer lg:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="btn btn-square btn-ghost drawer-button"
              >
                <FaBars className="h-5 w-5" />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 min-h-full w-56">
                <li>
                  <a className="text-lg">
                    <FaChartArea className="h-5 w-5" />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a className="text-lg">
                    <FaStore className="h-5 w-5" />
                    Products
                  </a>
                </li>
                <li>
                  <a className="text-lg">
                    <FaTable className="h-5 w-5" />
                    Categories
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
}