import {useEffect, useState} from 'react' 
import { useLoaderData } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProductCardClient from '../../components/productCardClient'

export async function loader({params}) {
    const { category_id } = params
    
    try {
        const response = await fetch(`http://localhost:5500/product/${category_id}?cursor=&limit=5`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return [data, category_id]
    } catch (error) {
        return {error: error.message}
    }
    
}

export default function CategoryProducts() {
    const [products, category_id] = useLoaderData()
    const [items, setItems] = useState(products)
    const [hasMore, setHasMore] = useState(true)
    const [cursor, setCursor] = useState(null)


    useEffect(() => {
        if(cursor)  fetchMoreData()
    }, [cursor])
    

    const fetchMoreData = async () => {
        try {
              const response = await fetch(`http://localhost:5500/product/${category_id}?cursor=${cursor || ''}&limit=5`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            const data = await response.json()
            setItems(prev => [...prev, ...data])
            data.length > 0 ? setHasMore(true): setHasMore(false)
            
         } catch (error) {
            console.log(error)
         }
    }

    return (
      <>
        {' '}
        {items.length ? (
          <div className="w-full">
            
            <InfiniteScroll
              className="w-full"
              dataLength={items.length}
              hasMore={hasMore}
              next={() => setCursor(items[items.length - 1]._id)}
              loader={
                <span className="loading loading-infinity loading-lg"></span>
              }
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <div className="flex w-full flex-row items-start flex-wrap lg:p-5 lg:m-5">
                {items.map((item) => (
                  <ProductCardClient key={item._id} item={item} />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        ) : (
          <span>No Products</span>
        )}{' '}
      </>
    )
    
}