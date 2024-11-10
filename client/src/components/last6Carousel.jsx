import { useEffect } from 'react'
import { useFetcher } from 'react-router-dom'
import ProductCardClient from './productCardClient'


import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'
import {
  Pagination,
  Autoplay,
  Navigation,
  
} from 'swiper/modules'
// eslint-disable-next-line react/prop-types
export default function HomePageLast6() {
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/product/last6/loader')
    }
  }, [fetcher])

    return fetcher.data ? (
      <div className=" bg-base-200 p-10 w-full">
        <h1 className="text-4xl m-6 font-bold"> Nouveaux Produits </h1>

       <Swiper
          modules={[Pagination, Navigation, Autoplay]}
       autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
              loop={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                400: {
                  slidesPerView: 2,
                },
                639: {
                  slidesPerView: 2,
                },
                865: {
                  slidesPerView: 3,
                },
                1000: {
                  slidesPerView: 4,
                },
                1500: {
                  slidesPerView: 4,
                },
                1700: {
                  slidesPerView: 4,
                },
              }}
              pagination={{ clickable: true }}
              spaceBetween={50}
              navigation
              className="w-full"
              
            >
          {fetcher.data.map((item) => (
              <SwiperSlide key={item._id}>
                <ProductCardClient item={item} />
              </SwiperSlide>
           
          ))}
        </Swiper>
      </div>
    ) : (
      ''
    )
}
