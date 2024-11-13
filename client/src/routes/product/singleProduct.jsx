import { FaCartShopping, FaPaintRoller, FaTextWidth, FaTextHeight } from 'react-icons/fa6'
import { useLocation, useLoaderData, useFetcher, useNavigation } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import AnimatedLayout from '../../animation/animatedLayout'

export async function loader({ params }) {
  const { id } = params
  try {
    const response = await fetch(
      `https://api.mobilium.info/product/single/${id}`,
      {
        mathod: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const product = await response.json()
    return product
    
  } catch (error) {
    return {error: error.message}
  }
}
export default function SingleProduct() {
  const navigation = useNavigation()
  const location = useLocation()
  const fetcher = useFetcher()
  const product = useLoaderData()
  return (
    <AnimatedLayout>
      {navigation.state === 'loading' ? (
        <div className="flex justify-center w-full">
          <span className="loading loading-infinity loading-lg m-auto"></span>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row my-5 justify-center">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation
            loop={true}
            slidesPerView={1}
            pagination={{ clickable: true }}
            spaceBetween={50}
            className="w-full flex items-center justify-center"
          >
            {product.images.split(';').map((image) => (
              <SwiperSlide key={Math.random() * 10e9}>
                <img
                  src={'https://api.mobilium.info/' + image}
                  className="m-auto max-h-96"
                  alt="Tailwind CSS Carousel component"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="card bg-base-100 p-5 lg:p-0 lg:max-w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                {product.name}
                <div className="badge badge-primary badge-outline">
                  {product.type}
                </div>
              </h2>
              <p className="text-sm">{product.description}</p>

              <div>
                <span
                  className={
                    product.onSale ? 'line-through' : 'text-xl font-bold'
                  }
                >
                  ${product.price.$numberDecimal}
                </span>
                {product.onSale ? (
                  <span className="text-xl font-bold mx-2">
                    $
                    {(
                      product.price.$numberDecimal -
                      (product.onSale.discount_rate.$numberDecimal / 100) *
                        product.price.$numberDecimal
                    ).toFixed(2)}
                  </span>
                ) : (
                  ''
                )}
              </div>
              <div className="badge badge-outline">
                {product.category.name}{' '}
              </div>
              <ul className="menu bg-base-200 my-3 lg:m-1 lg:menu-horizontal rounded-box">
                {product.color ? (
                  <li>
                    <a>
                      <FaPaintRoller />
                      {product.color}
                    </a>
                  </li>
                ) : (
                  ''
                )}

                {product.width ? (
                  <li>
                    <a>
                      <FaTextWidth />
                      {product.width}cm
                    </a>
                  </li>
                ) : (
                  ''
                )}

                {product.length ? (
                  <li>
                    <a>
                      <FaTextHeight />
                      {product.length}cm
                    </a>
                  </li>
                ) : (
                  ''
                )}
              </ul>

              <p className="text-sm">{product.additional_info}</p>
              <fetcher.Form
                method="post"
                action="/product/addToCart"
                className="w-full"
              >
                <input type="hidden" value={product._id} name="itemId" />
                <input
                  type="hidden"
                  value={location.pathname}
                  name="prevLocation"
                />
                {product.size ? (
                  <div className="flex flex-row">
                    {product.size.split(',').map((size) => (
                      <div
                        key={Math.random() * 10e9}
                        className="form-control mx-2"
                      >
                        <input
                          type="radio"
                          value={size}
                          name="size"
                          className="radio"
                        />
                        <label className="label">
                          <span className="label-text"> {size} </span>
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  ''
                )}
                <input type="hidden" value={1} name="qty" />
                <button
                  type="submit"
                  className="btn btn-primary text-white w-full"
                >
                  <FaCartShopping />
                  {fetcher.state !== 'submitting' ? (
                    'Ajoutez au Panier'
                  ) : (
                    <span className="loading loading-infinity loading-md"></span>
                  )}
                </button>
              </fetcher.Form>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
      )}
    </AnimatedLayout>
  )
}
