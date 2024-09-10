import { useNavigation, Link } from "react-router-dom"
import toast, {Toaster} from 'react-hot-toast'


export async function action({ request, params }) {
   
    console.log('Inside action');
    const { id } = params
    const url = new URL(request.url)
    const type = url.searchParams.get('type') || 'product'
    
    try {
        const response = await fetch(
          `http://localhost:5500/admin/product/${id}?type=${type}`,
          {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        )
 const toastOptions = {
   duration: 5000,
   id: Math.round(Math.random() * 1e9),
 }
        const msg = await response.json()
        if (msg.msg) {
           
            //toast.dismiss()
            toast.success(msg.msg, toastOptions)

            setTimeout(()=>{ console.log('Waiting')}, 5000)
            return null
        } else {
            toast.error(msg.error, toastOptions)
            setTimeout(() => {
              console.log('Waiting')
            }, 5000)
            return null
        }
        
        
    } catch (error) {
        throw new Error(error.message)
    }

}



export default function DeleteProduct() {
    const navigation = useNavigation()
    return (
      <div className="flex flex-col m-5">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Delete Page</h1>
              <p className="py-6">
                This page will tell you what happened to the delete operation!
              </p>
              <Link to="/admin/products/view" className="btn btn-primary">
                {' '}
                {navigation.state === 'submitting' ? (
                  <span className="loading loading-infinity loading-lg"></span>
                ) : (
                  'Go Back'
                )}
              </Link>
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    )
}