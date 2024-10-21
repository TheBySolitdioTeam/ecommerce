import HomePageSales from "../components/homePageSales";
import {useNavigation} from "react-router-dom"
import HomePageLast6 from "../components/last6Carousel";
import AnimatedLayout from "../animation/animatedLayout";
import HomePageCategoriesLast6 from "../components/last6Categories";
export default function HomePage() {
  const navigation = useNavigation()
    return (
      <AnimatedLayout>
        {' '}
        {navigation.state === 'loading' ? (
          <div className="flex justify-center w-full">
            <span className="loading loading-infinity loading-lg m-auto"></span>
          </div>
        ) : (
          <>
            <HomePageCategoriesLast6/>
            <HomePageSales />

            <HomePageLast6 />
          </>
        )}{' '}
      </AnimatedLayout>
    )
}