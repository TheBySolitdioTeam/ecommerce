
export async function loader() {
  try {
    const response = await fetch(
      `http://localhost:5500/admin/category/primary`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const primeCategories = await response.json()
    //console.log(primeCategories.data)
    return primeCategories.data
  } catch (error) {
    return { error: error.message }
  }
}


