import {redirect} from 'react-router-dom'
export async function action({ request }) {
    const formData = await request.formData()
    const bodyObj = Object.fromEntries(formData)
    bodyObj.user_id= localStorage.getItem("user_id")
    try {
        const response = await fetch('https://api.mobilium.info/cart/', {
          method: 'POST',
          //credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyObj),
        })
      const message = await response.json()
        
      if (message.msg) {
        localStorage.setItem("user_id", message.user_id.toString())
        return redirect(bodyObj.prevLocation) 
      }
      throw new Error(message.error)
    } catch (error) {
       throw new Error(error.message)
    }

}

