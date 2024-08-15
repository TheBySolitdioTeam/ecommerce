import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import AdminRoot from './routes/admin/adminRoot'
import Login, {action as loginAction} from './routes/login'
import ErrorPage from './error-page'
import './index.css'



const router = createBrowserRouter([{
  path: "/",
  element: <Root />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: '/login',
      element: <Login />,
      action: loginAction
    }
  ]
}, {
  path: "/admin",
  element:<AdminRoot/>
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
