import { useEffect } from 'react'
import { useFetcher, Link } from 'react-router-dom'
//import ProductCardClient from './productCardClient'

// eslint-disable-next-line react/prop-types
export default function HomePageCategoriesLast6() {
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/product/categories/last6/loader')
    }
  }, [fetcher])

  return fetcher.data ? (
    <div className="carousel w-full">
      {fetcher.data.map((item) => (
        <div
          id={`slide${item._id}`}
          key={item._id}
          className="carousel-item w-full"
        >
          
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: `url(https://api.mobilium.info/${item.image})`,
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold"> {item.name} </h1>
                <p className="mb-5">
                  Explorez l&apos;ensemble de notre catalogue de produits et
                  filtrez ou triez par ordre vous découvrez le site le plus
                  étonnant!
                </p>
                <Link
                  to={`/product/categoryProducts/${item._id}`}
                  className="btn btn-primary"
                >
                  Explorer
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <>
      <div
        className="hero min-h-1/2"
        style={{
          backgroundImage:
            'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Bienvenue</h1>
            <p className="mb-5">
              Explorez l&apos;ensemble de notre catalogue de produits et filtrez
              ou triez par ordre vous découvrez le site le plus étonnant!
            </p>
            <Link to={'/product/type?name=product'} className="btn btn-primary">
              Explorer
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
