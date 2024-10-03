import {redirect} from 'react-router-dom'
export async function action() {
    try {
        const response = await fetch('https://api.mobilium.info/auth/logout', {
          method: 'POST',
          credentials: 'include',
          body: {},
        })
        await response.json()
        return redirect("/")
    } catch (error) {
        return {error: error.message}
    }
}