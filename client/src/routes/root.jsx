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
      if (potUser.msg) return [potUser, {}]
      const cartResponse = await fetch(`http://localhost:5500/cart/`, {
        method: "GET",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const cart = await cartResponse.json()
      console.log(cart)
      return [potUser, cart[0]||{}]
    } catch (error) {
      return { msg: error.message }
    }
}
export default function Root() {
    const [user,cart] = useLoaderData()
    return (<>
        <Navbar user={user} cart={cart} />
        <Outlet context={[user]}/>
        <Footer/>
    </>)
}