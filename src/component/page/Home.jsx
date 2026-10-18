import AboutUs from "../sections/AboutUs"
import CustomerReviews from "../sections/CustomerReviews"
import FoodItems from "../sections/FoodItems"
import HeroSection from "../sections/HeroSection"
import Highlights from "../sections/Highlights"

const Home = () => {
  return (
    <>
        <HeroSection />
        <Highlights />
        <AboutUs/>
        <FoodItems/>
        <CustomerReviews/>
    </>
  )
}

export default Home