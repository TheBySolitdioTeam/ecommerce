import {useState, useEffect, useRef} from 'react'
import { useLoaderData, useLocation } from "react-router-dom"
import ProductCardClient from "../../components/productCardClient"
import InfiniteScroll from 'react-infinite-scroll-component'
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
        console.log(items)
        return [items,name]
    } catch (error) {
        return {error: error.message}
    }
}
//THIS IS THE CUSTOM HOOK

const usePrevLocation = (location) => {

const prevLocRef = useRef(location)

useEffect(()=>{

prevLocRef.current = location

},[location])

return prevLocRef.current

}

export default function ProductType() {
   const location = useLocation()
   const prevLocation = usePrevLocation(location)
    const [initialItems, name] = useLoaderData()
    const [cursor, setCursor] = useState(null)
    const [items, setItems] = useState(initialItems)
    const [hasMore, setHasMore] = useState(true)


    useEffect(() => {
      //console.log(prevLocation, location)
      if (prevLocation !== location) {
        setItems([])
        fetchMoreData(null)
      } else {
        console.log('same', cursor)
        if (cursor) fetchMoreData(cursor)
      }
    }, [cursor,location])

    const fetchMoreData = async (cursor) => {
        try {
            const response = await fetch(
              `http://localhost:5500/product/?type=${name}&cursor=${
                cursor || ''
              }&limit=5`,
              {
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            const newItems = await response.json()
            setItems(prev => [...prev, ...newItems])
            newItems.length > 0 ? setHasMore(true): setHasMore(false)
        } catch (error) {
            console.log(error.message);
        }
    }
    
    return (
      <>
        {items.length > 0 ? (
                <InfiniteScroll
                    className='w-full'
            dataLength={items.length}
            hasMore={hasMore}
            next={()=> setCursor(items[items.length - 1]._id)}
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
                        {items.map(item => <ProductCardClient key={item._id} item={item} />)}
            </div>
          </InfiniteScroll>
        ) : (
          'No Product Found!'
        )}
      </>
    )
    
}