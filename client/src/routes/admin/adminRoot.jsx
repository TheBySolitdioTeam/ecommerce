import AdminHeader from "./components/header";
import {Outlet} from 'react-router-dom'
import { FaChartArea, FaStore, FaTable } from 'react-icons/fa6'
export default function AdminRoot() {
    return (
      <>
        <AdminHeader />
        <div className="flex-row">
          <div className="w-1/4 hidden lg:flex">
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
          <div className="w-3/4">
            <Outlet />
          </div>
        </div>
      </>
    )
}