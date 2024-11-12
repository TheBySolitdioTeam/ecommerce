import { useEffect } from 'react'
import { useFetcher, useLoaderData, redirect } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

// Getting the single content
export async function loader({ params }) {
  const { id } = params

  //console.log(`http:localhost:5500/admin/product/${id}?type=${type}`)

  try {
    const response = await fetch(
      `https://api.mobilium.info/admin/content/${id}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const content = await response.json()
    //console.log(product)
    return content
  } catch (error) {
    return { error: error.message }
  }
}

export async function action({ request, params }) {
  const { id } = params
  const formData = await request.formData()

  const url = `https://api.mobilium.info/admin/content/${id}`
  let methodName = 'PUT'
  let bodyObj = formData
  let headersObj = {}

  // Setting the request options for there is no image with the request
  if (formData.get('images').name === '') {
    methodName = 'PATCH'
    const initialObj = Object.fromEntries(formData)
    delete initialObj.images
    bodyObj = JSON.stringify(initialObj)
    headersObj = { 'Content-Type': 'application/json' }
  }
  try {
    const data = await SendRequest(url, methodName, bodyObj, headersObj)
    return data
  } catch (error) {
    return { error: error.message }
  }
}
async function SendRequest(url, methodName, bodyObj, headersObj) {
  try {
    const response = await fetch(url, {
      method: methodName,
      credentials: 'include',
      headers: headersObj,
      body: bodyObj,
    })
    const data = await response.json()
    return data
  } catch (error) {
    return { error: error.message }
  }
}

export default function EditContent() {
  const fetcher = useFetcher()
    const content = useLoaderData()
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

       redirect('/admin/content/viewProject')
     }, [fetcher])

  return (
    <div className="card my-5 mx-auto bg-base-100 w-full max-w-sm shrink-0 ">
      <h1 className="text-2xl mb-5 m-auto">Modifier Projet/Collection</h1>
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
            defaultValue={content.name}
            placeholder="Name"
            className="input input-bordered"
            name="name"
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
          />
        </div>
        <div className="form-control mb-5">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <select
            name="type"
            defaultValue={content.type}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="Projet" disabled>
              Choisis le Type
            </option>
            <option value="Project">Projet</option>
            <option value="Collection">Collection</option>
          </select>
        </div>
        <textarea
          placeholder="plus de details"
          className="textarea textarea-bordered textarea-lg w-full max-w-xs"
          defaultValue={content.details}
          name="details"
        ></textarea>
        <Toaster />
        <div className="form-control mt-6">
          <button className="btn btn-primary">
            {' '}
            {fetcher.state === 'submitting' ? (
              <span className="loading loading-infinity loading-md"></span>
            ) : (
              'Creer'
            )}
          </button>
        </div>
      </fetcher.Form>
    </div>
  )
}
