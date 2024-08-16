import { useEffect } from 'react'
import { useFetcher } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'


export async function action({ request }) {
  const formData = await request.formData()
  const fileName = formData.get('image').name
  let url = ''
  let bodyForm = ''
  if (fileName.trim() === "") {
    const bodyObject = Object.fromEntries(formData)
    delete bodyObject.image
    url = 'http://localhost:5500/admin/category/create'
    bodyForm = JSON.stringify(bodyObject)

  } else {
     url = 'http://localhost:5500/admin/multer/createCategory'
     bodyForm = formData
  }
  console.log(bodyForm)
   
 const contentHeaders = typeof(bodyForm) === 'string' ? {
        'Content-Type': 'application/json',
      }: {}
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: contentHeaders,
      body: bodyForm,
    })

    const category = await response.json()
    return category
  } catch (error) {
    return {error: error.message }
  }
}


export default function CreateCategory() {
  const fetcher = useFetcher()

  useEffect(() => {
    const toastOptions = {
      duration: 5000,
      id: Math.round(Math.random()*1E9)
    }

    fetcher.data
      ? fetcher.data.error
        ? toast.error(fetcher.data.error, toastOptions)
        : toast.success('Category created with success!', toastOptions)
      : ''
    
    
    
   
  }, [fetcher])
    return (
      <>
        <div className="card my-5 mx-auto bg-base-100 w-full max-w-sm shrink-0 ">
          <fetcher.Form
            method="post"
            className="card-body"
            encType="multipart/form-data"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name *</span>
              </label>
              <input
                type="name"
                placeholder="Category Name"
                className="input input-bordered"
                name="name"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                name="image"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Parent</span>
              </label>
              <PrimeCategorySelector name="parent_id"/>
            </div>
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
      </>
    )
}

// eslint-disable-next-line react/prop-types
function PrimeCategorySelector({name}) {
  const fetcher = useFetcher() 

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/admin/categories/view')
    }
  }, [fetcher])

  return (fetcher.data ? <select 
      defaultValue={null}
    className="select select-bordered w-full max-w-xs"
    name={name}
    >
      <option value={""}>No Parent</option>
      {fetcher.data.map((item) => (
        <option key={item._id} value={item._id}>
          {' '}
          {item.name}{' '}
        </option>
      ))}
    </select> : ''
   
  )
}