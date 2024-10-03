export async function loader() {
    try {
        const response = await fetch(`https://api.mobilium.info/categories/`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const categories = await response.json()
        return categories
        
    } catch (error) {
        throw new Error(error.message)
    }
}