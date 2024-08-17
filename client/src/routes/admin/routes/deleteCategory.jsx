import { redirect } from "react-router-dom";



export async function action({ params }) {
    const { id } = params
    
    try {
        const response = await fetch(`http://localhost:5500/admin/category/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/JSON'
            }
        })

        await response.json()

        return redirect('/admin/categories/view')
        
    } catch (error) {
        throw new Error(error.message)
    }
}