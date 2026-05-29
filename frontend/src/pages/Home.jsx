import Hero from '@/components/Hero'
import PopularTours from '@/components/PopularTours'
import SearchBox from '@/components/SearchBox'
import TravelOfferBanner from '@/components/TravelofferBanner'
import TrendingDestinations from '@/components/TrendingDestination'
import TopTrendingSection from '@/components/TopTrendingSection'
import PopularThingsToDo from '@/components/PopularThingsToDo'
import WhyChoose from '@/components/WhyChoose'

import React from 'react'
import CustomerReviewsSection from '@/components/CustomerReviewSections'
import PromoSections from '@/components/PromoSections'
import TravelArticlesSection from '@/components/TravelArticlesSection'
import TravelBharatFooter from '@/components/Footer'

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
