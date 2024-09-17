import { useLoaderData } from "react-router-dom"
import ProductCardClient from "../../components/productCardClient"
export async function loader({ request }) {
    const url = new URL(request.url)
    const name = url.searchParams.get('name')

    try {
        const response = await fetch(`http://localhost:5500/product/?type=${name}&cursor=&limit=5`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const items = await response.json()
        return items
    } catch (error) {
        return {error: error.message}
    }
}

export default function ProductType() {
    const items = useLoaderData()
    
    return (<div className="flex w-full flex-row items-start flex-wrap lg:p-5 lg:m-5">
        {items.length > 0 ? items.map(item => (<ProductCardClient key={item._id} item={item} />)): 'No Product Found!'}
    </div>)
    
}