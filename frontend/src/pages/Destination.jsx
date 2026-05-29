import DestinationHero from '@/components/destination/DestinationHero'
import DestinationDescription from '@/components/destination/DestinationDescription'
import TourInfoCards from '@/components/destination/TourInfoCards'
import Footer from '@/components/Footer'
import React from 'react'
import TourMap from '@/components/destination/TourMap'
import CommentsSection from '@/components/destination/CommentsSection'
import BestExperiences from '@/components/destination/BestExperiences'


const Destination = () => {
  return (

    <div>
        <DestinationHero/>
        <TourInfoCards/>
        <DestinationDescription/>
        <BestExperiences/>
        <TourMap/>
        <CommentsSection/>
        <Footer/>
    </div>
  )
}

export default Destination