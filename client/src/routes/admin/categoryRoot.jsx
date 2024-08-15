import { NavLink, Outlet } from "react-router-dom"

export default function CategoryRoot() {
    return (
      <div className="flex flex-col justify-between">
        <div className="w-full">
          <ul className="flex mb-3 flex-row text-center justify-between menu menu-horizontal min-w-full bg-base-200">
            <li className="mx-auto">
              <NavLink
                to={'/admin/categories/create'}
                className={({ isActive, isPending }) =>
                  isActive
                    ? 'bg-primary text-base-100'
                    : isPending
                    ? 'bg-secondary'
                    : ''
                }
              >
                Create Category
              </NavLink>
            </li>
            <li className="mx-auto">
              <NavLink
                to={'/admin/categories/view'}
                className={({ isActive, isPending }) =>
                  isActive
                    ? 'bg-primary text-base-100'
                    : isPending
                    ? 'bg-secondary'
                    : ''
                }
              >
                View All Categories
              </NavLink>
            </li>
          </ul>
        </div>
        <Outlet className="w-full" />
      </div>
    )
}