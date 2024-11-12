import { useEffect } from "react"
import { useFetcher } from "react-router-dom"
import toast, {Toaster} from 'react-hot-toast'


export async function action({ request }) {
  const formData = await request.formData()
  //console.log(JSON.stringify(Object.fromEntries(formData)));

  try {
    const response = await fetch('https://api.mobilium.info/admin/content/', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })

    const data = await response.json()
    return data
  } catch (error) {
    return { error: error.message }
  }
}


export default function CreateContent() {
    const fetcher = useFetcher()

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
       //navigate('/admin/products/view')
     }, [fetcher])
    return (
        <div className="card my-5 mx-auto bg-base-100 w-full max-w-sm shrink-0 ">
            <h1 className="text-2xl mb-5 m-auto">Ajouter Projet/Collection</h1>
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
            <select
              name="type"
              defaultValue="product"
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