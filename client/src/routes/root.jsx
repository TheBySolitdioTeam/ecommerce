import Navbar from "../components/navbar"
import Footer from "../components/footer"
import { Outlet, useLoaderData } from "react-router-dom"

export async function loader() {
    try {
      const response = await fetch('http://localhost:5500/auth/login/status', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        const potUser = await response.json()
        return potUser
    } catch (error) {
      return { msg: error.message }
    }
}
export default function Root() {
    const user = useLoaderData()
    return (<>
        <Navbar user={user} />
        <Outlet context={[user]}/>
        <Footer/>
    </>)
}