import Navbar from "../components/navbar"
import Footer from "../components/footer"
import { useLoaderData } from "react-router-dom"
import AnimatedOutlet from "../animation/animatedOutlet"

export async function loader() {
    try {
      const response = await fetch(
        'https://api.mobilium.info/auth/login/status',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        const potUser = await response.json()
      if (potUser.msg) return [potUser, {}]
      const cartResponse = await fetch(`https://api.mobilium.info/cart/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
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
    return (
      <>
        <Navbar user={user} cart={cart} />
        <AnimatedOutlet context={[user]} />
        <Footer />
      </>
    )
}