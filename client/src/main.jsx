import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import AdminRoot from './routes/admin/adminRoot'
import Login, {action as loginAction} from './routes/login'
import ErrorPage from './error-page'
import './index.css'
import CategoryRoot from './routes/admin/routes/categories/categoryRoot'
import CreateCategory, {
  action as createCategoryAction,
} from './routes/admin/routes/categories/createCategory'
import PrimeCategories from './routes/admin/routes/categories/getPrimeCategories'
import InfinitePrimes, {
  loader as infiniteCategoryLoader,
} from './routes/admin/routes/categories/InfinitePrimes'
import GetCategorySearch, {
  loader as searchCategoryLoader,
} from './routes/admin/routes/categories/getCategorySearch'
import { action as deleteCategoryAction } from './routes/admin/routes/categories/deleteCategory'
import EditCategory, {loader as editCategoryLoader, action as editCategoryAction} from './routes/admin/routes/categories/editCategory'
import GetSubCategories, {
  loader as subCategoriesLoader,
} from './routes/admin/routes/categories/getSubCategories'
import { loader as specialPrimaryLoader } from './routes/admin/routes/categories/getPrimariesLoader'
import ProductRoot from './routes/admin/routes/products/productRoot'
import CreateProduct, {action as createProductAction} from './routes/admin/routes/products/createProduct'
import ViewProductRoot from './routes/admin/routes/products/viewProductRoot'
import GetAllProducts, {loader as getAllProductsLoader} from './routes/admin/routes/products/getallProducts'
import ProductSearch, {loader as productSearchLoader} from './routes/admin/routes/products/productSearch'
import EditProduct, {loader as editProductLoader, action as editProdcutAction} from './routes/admin/routes/products/editProduct'
//import loader from 'css-loader'
//import loader from 'css-loader'



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
        path: '/admin/products',
        element: <ProductRoot />,
        errorElement: <ErrorPage />,
        children: [{
          index: true,
          element: <CreateProduct />,
          action: createProductAction,
          errorElement: <ErrorPage/>
        }, {
          path: '/admin/products/edit/:id',
          element: <EditProduct />,
          errorElement: <ErrorPage />,
          loader: editProductLoader,
          action: editProdcutAction
        },
          {
          path: "/admin/products/view",
          element: <ViewProductRoot />,
          errorElement: <ErrorPage />,
          children: [{
            index: true,
            element: <GetAllProducts />,
            loader: getAllProductsLoader,
            errorElement: <ErrorPage/>
          }, {
            path: '/admin/products/view/search',
            element: <ProductSearch />,
            loader: productSearchLoader,
            errorElement: <ErrorPage/>
          }]
        }]
      },
      {
        path: '/admin/categories',
        element: <CategoryRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/admin/categories/loader',
            loader: specialPrimaryLoader,
          },
          {
            index: true,
            element: <CreateCategory />,
            action: createCategoryAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/categories/view',
            element: <PrimeCategories />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <InfinitePrimes />,
                loader: infiniteCategoryLoader,
                errorElement: <ErrorPage />,
              },
              {
                path: '/admin/categories/view/search',
                element: <GetCategorySearch />,
                loader: searchCategoryLoader,
                errorElement: <ErrorPage />,
              },
            ],
          },
          {
            path: '/admin/categories/delete/:id',
            action: deleteCategoryAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/categories/edit/:id',
            element: <EditCategory />,
            loader: editCategoryLoader,
            action: editCategoryAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/categories/subs/:parent_id',
            element: <GetSubCategories />,
            loader: subCategoriesLoader,
            errorElement: <ErrorPage />,
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
