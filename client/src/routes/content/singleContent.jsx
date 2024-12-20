import { useLoaderData } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import AnimatedLayout from "../../animation/animatedLayout"
// Getting the single content
export async function loader({ params }) {
  const { id } = params

  

  try {
    const response = await fetch(
      `https://api.mobilium.info/contents/${id}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const content = await response.json()
    //console.log(product)
    return content
  } catch (error) {
    return { error: error.message }
  }
}
export default function SingleContent() {
    const singleContent = useLoaderData()
    return (
      <AnimatedLayout>
        <div className="flex flex-col justify-center">
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
            {singleContent.images.map((item) => (
              <SwiperSlide key={item}>
                <img src={'https://api.mobilium.info/' + item} className="m-auto max-h-screen" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="p-10">
            <h1 className="text-3xl my-3 border-b-2 border-primary font-bold lg:text-5xl">
              {' '}
              {singleContent.name}{' '}
            </h1>
            <p className=""> {singleContent.details} </p>
          </div>
        </div>
      </AnimatedLayout>
    )
}