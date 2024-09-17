import { redirect } from "react-router-dom"

export async function action({ params,request }) {
    const { id } = params
    const formData = await request.formData()
    const bodyObj = Object.fromEntries(formData)

    try {
        const response = await fetch(`http://localhost:5500/cart/${id}?itemId=${bodyObj.itemId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const msg = await response.json()
        if (!msg.error) return redirect("/product/type?name=product")
        throw new Error(msg.error)
    } catch (error) {
        throw new Error(error.message)
    }
    
}