/* eslint-disable react/prop-types */

import { NavLink, Form, Link } from 'react-router-dom'
import CartDropdown from './cartDropdown'
import { FaBars } from 'react-icons/fa6'
//import AllCategoriesNavbar from './allCategoriesNavbar'

export default function Navbar({ user, cart }) {
 
  return (
    <>
      <div className="navbar backdrop-blur-sm sticky top-0 z-40 lg:z-50">
        <div className="navbar-start flex">
          <div className="drawer lg:hidden z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="btn btn-outline hover:bg-primary drawer-button"
              >
                <FaBars className=" h-5 w-5" />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li className="border-y-2 p-1 text-xl">
                  {user.msg ? (
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? ' bg-primary text-base-100'
                          : isPending
                          ? ' bg-secondary'
                          : ''
                      }
                      to="/login"
                    >
                      Se Connecter
                    </NavLink>
                  ) : (
                    <NavLink to="/admin/products/">Compte</NavLink>
                  )}
                </li>
                <li className="border-y-2 p-1 text-xl">
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? ' bg-primary text-base-100'
                        : isPending
                        ? ' bg-secondary'
                        : ''
                    }
                    to="/product/type?name=product"
                  >
                    Produits
                  </NavLink>
                </li>
                <li className="border-y-2 p-1 text-xl">
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? ' bg-primary text-base-100'
                        : isPending
                        ? ' bg-secondary'
                        : ''
                    }
                    to="/content/projects"
                  >
                    Projets
                  </NavLink>
                </li>
                <li className="border-y-2 p-1 text-xl">
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? ' bg-primary text-base-100'
                        : isPending
                        ? ' bg-secondary'
                        : ''
                    }
                    to="/content/collections"
                  >
                    Collections
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <Link to={'/'} className="btn btn-ghost text-xl">
            <img width={80} src={'/logo.png'} alt="logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              {user.msg ? (
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? ' bg-primary text-base-100'
                      : isPending
                      ? ' bg-secondary'
                      : ''
                  }
                  to="/login"
                >
                  Se Connecter
                </NavLink>
              ) : (
                <NavLink to="/admin/products/">Account</NavLink>
              )}
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive
                    ? ' bg-primary text-base-100'
                    : isPending
                    ? ' bg-secondary'
                    : ''
                }
                to="/product/type?name=product"
              >
                Produits
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end mx-5">
          <CartDropdown user={user} cart={cart} />
          {user.msg ? (
            ''
          ) : (
            <Form method="post" action="/logout">
              <button className="btn btn-base btn-sm">Se Deconnecter</button>
            </Form>
          )}
        </div>
      </div>
      <hr />
    </>
  )
}
