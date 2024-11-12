import { redirect } from "react-router-dom";
export async function action({params}) {
    const { id } = params 
    try {
        const req = await fetch(`https://api.mobilium.info/admin/content/${id}`, {
            method: "DELETE",
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await req.json()
        if (response.error) throw new Error(response.error)
        return redirect("/admin/content/viewProject")
    } catch (error) {
        throw new Error(error.message)
    }
   
}