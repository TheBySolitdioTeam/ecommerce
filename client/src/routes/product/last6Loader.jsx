export async function loader() {
    try {
        const response = await fetch("http://localhost:5500/product/last6", {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
     } catch (error) {
        console.log(error.message)
    }
}