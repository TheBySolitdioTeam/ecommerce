import { redirect } from "react-router-dom"
import toast from 'react-hot-toast'


export async function action({ params, request }) {
    const { id } = params
    const {type} = request.query
    
    try {
        const response = await fetch(`http://loacalhost:5500/admin/product/${id}?type=${type}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'}
        })

        const msg = await response.json()
        if (msg.msg) {
            const toastOptions = {
              duration: 5000,
              id: Math.round(Math.random() * 1e9),
            }
            toast.dismiss()
            toast.success(msg.msg, toastOptions)
            return redirect('/admin/products/view')
        } 
        throw new Error('An Error occured!')
        
    } catch (error) {
        throw new Error(error.message)
    }

}