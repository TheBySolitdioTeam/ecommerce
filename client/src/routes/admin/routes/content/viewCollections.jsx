import { useEffect, useState } from 'react'
import { Link, useLoaderData, Form, useNavigation } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FaEye, FaPencil, FaPlus, FaX } from 'react-icons/fa6'
//import ProductCard from '../../components/productCard'

export async function loader() {
  try {
    const response = await fetch(
      `https://api.mobilium.info/admin/content/?cursor=&limit=${5}&type=Collection`,
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

export default function GetAllCollections() {
  const firstItems = useLoaderData()
  const navigation = useNavigation()
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
        }&limit=${5}&type=Collection`,
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
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <Link to={'/admin/content/create'} className="btn mx-2 btn-primary">
          {' '}
          <FaPlus /> Ajouter{' '}
        </Link>{' '}
        <Link
          to={'/admin/content/viewProject'}
          className="btn mx-2 btn-accent text-white"
        >
          {' '}
          <FaEye /> Project
        </Link>
      </div>
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
                      to={`/admin/content/edit/${item._id}`}
                      className="btn btn-warning"
                    >
                      {' '}
                      <FaPencil className="h-5 w-5" /> Edit
                    </Link>
                    <Form
                      action={`/admin/content/delete/${item._id}`}
                      method="post"
                    >
                      <button type="submit" className="btn btn-error">
                        {' '}
                        {navigation.state === 'idle' ? (
                          <>
                            <FaX className="h-5 w-5" /> Delete
                          </>
                        ) : (
                          <span className="loading loading-infinity"></span>
                        )}
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        'No Projects!'
      )}
    </div>
  )
}
