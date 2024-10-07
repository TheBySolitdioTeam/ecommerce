import Navbar from "../components/navbar"
import Footer from "../components/footer"
import { useLoaderData } from "react-router-dom"
import AnimatedOutlet from "../animation/animatedOutlet"
import { UserContext } from './admin/UserContext'
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
      //if (potUser.msg) return [potUser, {}]
      const guestSession = localStorage.getItem("user_id") || ''
      const cartResponse = await fetch(`https://api.mobilium.info/cart/?guest=${guestSession}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const cart = await cartResponse.json()
      console.log(cart)
      return [potUser, cart.length >0 ? cart[0] : {}]
    } catch (error) {
      return { msg: error.message }
    }
}
export default function Root() {
  const [user, cart] = useLoaderData()
  //const navigation = useNavigation()
  return (
    <>
      <Navbar user={user} cart={cart} />
      <UserContext.Provider value={user}>
        <AnimatedOutlet />
      </UserContext.Provider>
      <Footer />
    </>
  )
}