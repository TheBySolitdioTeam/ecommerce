import { useNavigation, redirect } from "react-router-dom"
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

        const msg = await response.json()
        if (msg.msg) {
            const toastOptions = {
              duration: 5000,
              id: Math.round(Math.random() * 1e9),
            }
            toast.dismiss()
            toast.success(msg.msg, toastOptions)

            //setTimeout(() => redirect('/admin/products/view'), 5000)
            return redirect('/admin/products/view')
        } 
        throw new Error(msg.error)
        
    } catch (error) {
        throw new Error(error.message)
    }

}



export default function DeleteProduct() {
    const navigation = useNavigation()
    return (
        <div className="flex flex-col m-5">
            {navigation.state === 'submitting' ? <span className="loading loading-infinity loading-lg"></span>: ''}
        <Toaster />
      </div>
    )
}