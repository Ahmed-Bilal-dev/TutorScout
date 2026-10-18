import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import Stats from '../components/Stats'
import PopularSubjects from '../components/PopularSubjects'
import TopTutors from '../components/TopTutors'
import HowItWorksSection from '../components/HowItWorksSection'
import WhyChooseUs from '../components/WhyChooseUs'
import TeachingModes from '../components/TeachingModes'
import Testimonials from '../components/Testimonials'
import BecomeTutorCTA from '../components/BecomeTutorCTA'
import Footer from '../components/Footer'

function Home() {

    const location = useLocation()

    useEffect(() => {

        if (location.hash) {

            const section = document.getElementById(
                location.hash.substring(1)
            )

            if (section) {
                setTimeout(() => {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    })
                }, 100)
            }
        }

    }, [location])

    return (
        <>
            <Hero />
            <SearchBar />
            <Stats />
            <PopularSubjects />
            <TopTutors />
            <HowItWorksSection />
            <WhyChooseUs />
            <TeachingModes />
            <Testimonials />
            <BecomeTutorCTA />
            <Footer />
        </>
    )
}

export default Home

