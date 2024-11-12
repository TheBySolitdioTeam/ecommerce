import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FaPencil } from 'react-icons/fa6'
//import ProductCard from '../../components/productCard'

export async function loader() {
  try {
    const response = await fetch(
      `https://api.mobilium.info/admin/content/?cursor=&limit=${5}&type=Project`,
      {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const allProducts = await response.json()
    console.log(allProducts)
    return allProducts
  } catch (error) {
    return { error: error.message }
  }
}

export default function GetAllProducts() {
  const firstItems = useLoaderData()
  
  const [items, setItems] = useState(firstItems)
  const itemsIds = items.map((item) => item._id).sort()
  const [cursor, setCursor] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
   
    cursor ? fetchMoreData() : ''
  }, [cursor])

  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        `https://api.mobilium.info/admin/content/?cursor=${
          cursor || ''
        }&limit=${5}&type=Project`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const moreItems = await response.json()
      console.log(moreItems)
      setItems((prevItems) => [...prevItems, ...moreItems])

      moreItems.length > 0 ? setHasMore(true) : setHasMore(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {items.length > 0 ? (
        <InfiniteScroll
          dataLength={items.length || 0}
          next={() => setCursor(itemsIds[itemsIds.length - 1])}
          hasMore={hasMore}
          loader={<span className="loading loading-infinity loading-lg"></span>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="flex flex-row flex-wrap">
            {items.map((item) => (
              <div key={item._id} className="card bg-base-100 image-full w-96 shadow-xl">
                <figure>
                  <img
                    src={"https://mobilium.info/"+item.images[0]}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.name}</h2>
                 
                  <div className="card-actions justify-end">
                    <button className="btn btn-warning"> <FaPencil className="h-5 w-5"/> Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        'No Products!'
      )}
    </div>
  )
}