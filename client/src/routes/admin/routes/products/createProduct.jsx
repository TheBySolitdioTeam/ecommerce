import { useEffect, useState } from 'react'
import { useFetcher, redirect } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import PrimeCategorySelector from '../../components/primeCategorySelector'
import ProductTypeSelector from '../../components/productTypeSelector'
import SalesSelector from '../../components/salesSelector'


export async function action({request}) {
  const formData = await request.formData()
  //console.log(JSON.stringify(Object.fromEntries(formData)));
   

    try {
        const response = await fetch('http://localhost:5500/admin/product/', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })

        const data = await response.json()
        return data
        
    } catch (error) {
        return {error: error.message}
    }
}

export default function CreateProduct() {
  const fetcher = useFetcher()
   const [type, setType] = useState('')
    useEffect(() => {
        const toastOptions = {
          duration: 5000,
          id: Math.round(Math.random() * 1e9),
        }
        toast.dismiss()

        fetcher.data
          ? fetcher.data.error
            ? toast.error(fetcher.data.error, toastOptions)
            : toast.success(fetcher.data.msg, toastOptions)
          : ''
      redirect('/admin/products/view')
    },[fetcher])
   
    
    return (
      <div className="card my-5 mx-auto bg-base-100 w-full max-w-sm shrink-0 ">
        <fetcher.Form
          method="post"
          className="card-body"
          encType="multipart/form-data"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              name="name"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              step=".01"
              min="0"
              placeholder="0.00"
              className="input input-bordered"
              name="price"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              placeholder="Desc"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
              name="description"
              required
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              type="number"
              step="1"
              min="0"
              placeholder="0"
              className="input input-bordered"
              name="qty"
              required
            />
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text">Images</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              name="images"
              multiple
              required
            />
          </div>
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <select name="type" onChange={(e)=> setType(e.target.value)} defaultValue="product" className="select select-bordered w-full max-w-xs">
              <option value="product" disabled>
                Product
              </option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
          <ProductTypeSelector type={type} />
          <PrimeCategorySelector name="category" />
          <SalesSelector name="onSale"/>
          <Toaster />
          <div className="form-control mt-6">
            <button className="btn btn-primary">
              {' '}
              {fetcher.state === 'submitting' ? (
                <span className="loading loading-infinity loading-md"></span>
              ) : (
                'Create'
              )}
            </button>
          </div>
        </fetcher.Form>
      </div>
    )
}