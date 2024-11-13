import { useEffect, useState } from 'react'
import { Link, useLoaderData} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import {FaEye } from 'react-icons/fa6'
import AnimatedLayout from '../../animation/animatedLayout'
//import ProductCard from '../../components/productCard'

export async function loader() {
  try {
    const response = await fetch(
      `https://api.mobilium.info/contents/?cursor=&limit=${5}&type=Project`,
      {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const allProjects = await response.json()
    console.log(allProjects)
    return allProjects
  } catch (error) {
    return { error: error.message }
  }
}

export default function GetAllClientProjects() {
  const firstItems = useLoaderData()
  const [items, setItems] = useState(firstItems)
  const itemsIds = items.map((item) => item._id).sort()
  const [cursor, setCursor] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    cursor ? fetchMoreData() : ''
  }, [cursor, firstItems])

  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        `https://api.mobilium.info/contents/?cursor=${
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
      <AnimatedLayout>
        <div className="flex flex-col justify-center my-5 p-5 lg:p-10">
          <div className="flex justify-center">
            <h1 className="text-3xl my-3 border-b-2 border-primary font-bold lg:text-5xl">
              {' '}
              Nos Projets
            </h1>
          </div>
          {items.length > 0 ? (
            <InfiniteScroll
              dataLength={items.length || 0}
              next={() => setCursor(itemsIds[itemsIds.length - 1])}
              hasMore={hasMore}
              loader={
                <span className="loading loading-infinity loading-lg"></span>
              }
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <div className="flex flex-row flex-wrap">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="card bg-base-100 image-full w-96 lg:w-108 m-2 shadow-xl"
                  >
                    <figure>
                      <img
                        src={'https://api.mobilium.info/' + item.images[0]}
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.name}</h2>

                      <div className="card-actions justify-end">
                        <Link
                          to={`/content/single/${item._id}`}
                          className="btn btn-info"
                        >
                          {' '}
                          <FaEye className="h-5 w-5" />{' '}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            'Pas de Projets!'
          )}
        </div>
      </AnimatedLayout>
    )
}
