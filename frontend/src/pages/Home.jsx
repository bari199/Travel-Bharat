import Hero from '@/components/Home/Hero'
import PopularTours from '@/components/Home/PopularTours'
import SearchBox from '@/components/Home/SearchBox'
import TravelOfferBanner from '@/components/Home/TravelofferBanner'
import TrendingDestinations from '@/components/Home/TrendingDestination'
import TopTrendingSection from '@/components/Home/TopTrendingSection'
import PopularThingsToDo from '@/components/Home/PopularThingsToDo'
import WhyChoose from '@/components/Home/WhyChoose'

import React from 'react'
import CustomerReviewsSection from '@/components/Home/CustomerReviewSections'
import PromoSections from '@/components/Home/PromoSections'
import TravelArticlesSection from '@/components/Home/TravelArticlesSection'
import TravelBharatFooter from '@/components/Home/Footer'

const Home = () => {
  return (
    <div>
      <Hero/>
      <SearchBox/>
      <WhyChoose/>
      <TrendingDestinations/>
      <PopularTours/>
      <TravelOfferBanner/>
      <PopularThingsToDo/>
      <TopTrendingSection/>
      <CustomerReviewsSection/>
      <PromoSections/>
      <TravelArticlesSection/>
      <TravelBharatFooter/>

    </div>
  )
}

export default Home