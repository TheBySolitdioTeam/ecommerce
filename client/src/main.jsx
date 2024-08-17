import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import AdminRoot from './routes/admin/adminRoot'
import Login, {action as loginAction} from './routes/login'
import ErrorPage from './error-page'
import './index.css'
import CategoryRoot from './routes/admin/categoryRoot'
import CreateCategory, {action as createCategoryAction} from './routes/admin/routes/createCategory'
import PrimeCategories, { loader as primeCategoriesLoader } from './routes/admin/routes/getPrimeCategories'
import {action as deleteCategoryAction} from './routes/admin/routes/deleteCategory'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/admin/categories',
        element: <CategoryRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/admin/categories/create',
            element: <CreateCategory />,
            action: createCategoryAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/categories/view',
            element: <PrimeCategories />,
            loader: primeCategoriesLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/categories/delete/:id',
            action:  deleteCategoryAction,
            errorElement: <ErrorPage />
          },
        ],
      },
    ],
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
