import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import AdminRoot from './routes/admin/adminRoot'
import Login, {action as loginAction} from './routes/login'
import ErrorPage from './error-page'
import './index.css'
import CategoryRoot from './routes/admin/categoryRoot'
import CreateCategory from './routes/admin/routes/createCategory'



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
  element: <AdminRoot />,
  errorElement: <ErrorPage />,
  children: [{
    path: '/admin/categories',
    element: <CategoryRoot />,
    children: [{
      path: '/admin/categories/create',
      element: <CreateCategory/>
    }]
  }]
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
