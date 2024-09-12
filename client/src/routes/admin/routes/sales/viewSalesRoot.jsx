import {Outlet} from 'react-router-dom'
export default function ViewSalesRoot() {
    return (
      <div className="flex flex-col justify-between">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">All Sales</a>
          </div>
          <div className="flex-none gap-2">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    )
}