import { useLoaderData, Form, useNavigation,Link } from "react-router-dom"
import { FaX, FaPen } from "react-icons/fa6"
export async function loader() {
    try {
         const response = await fetch(
           `http://localhost:5500/admin/category/primary`,
           {
             method: 'GET',
             credentials: 'include',
             headers: {
               'Content-Type': 'application/json',
             },
           }
         )

        const primeCategories = await response.json()
        //console.log(primeCategories.data)
        return primeCategories.data
        
    } catch (error) {
        return {error: error.message}
    }
   
}


export default function PrimeCategories() {
  const navigation = useNavigation()
    const primeCategories = useLoaderData()
    return (
      <div className="flex flex-col justify-between">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">All Categories</a>
          </div>
          <div className="flex-none gap-2">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap">
          {primeCategories.length !== 0
            ? primeCategories.map((item) => (
                <div
                  key={item._id}
                  className="card bg-base-100 image-full w-96 m-3 shadow-xl"
                >
                  <figure>
                    <img
                      src={
                        'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
                      }
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <div className="card-actions justify-end">
                      <Link
                        to={`/admin/categories/subs/${item._id}`}
                        className="btn btn-info btn-rounded border-none btn-sm"
                      >
                        View Subs
                      </Link>
                      <Link
                        to={`/admin/categories/edit/${item._id}`}
                        className="btn bg-yellow-500 btn-rounded border-none btn-sm"
                      >
                        <FaPen className="h-6 w-6 text-white" />
                      </Link>

                      <Form
                        method="post"
                        action={`/admin/categories/delete/${item._id}`}
                        /*onSubmit={(event) => {
                          if (
                            !confirm(
                              'Please confirm you want to delete this record.'
                            )
                          ) {
                            event.preventDefault()
                          }
                        }}*/
                      >
                        <button className="btn bg-red-700 btn-rounded border-none btn-sm">
                          {navigation.state === 'submitting' ? (
                            <span className="loading loading-infinity loading-sm"></span>
                          ) : (
                            <FaX className="h-6 w-6 text-white" />
                          )}
                        </button>
                      </Form>
                    </div>
                    <p className="text-white text-4xl">{item.name}</p>
                  </div>
                </div>
              ))
            : ''}
        </div>
      </div>
    )
}