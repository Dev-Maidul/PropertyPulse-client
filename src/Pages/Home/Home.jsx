import React from 'react';
import Banner from './Banner';
import AllProperties from '../AllProperties/AllProperties';
import AdvertisedSection from './AdvertisedSection';
import LatestReview from './LatestReview';
import WhyChooseUs from './WhyChooseUs';
import HowItWorks from './HowItWorks';
import FAQ from '../../Components/FAQ';
import Newsletter from '../../Components/Newsletter';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <AdvertisedSection></AdvertisedSection>
           
           <WhyChooseUs></WhyChooseUs>
           <HowItWorks></HowItWorks>
           <LatestReview></LatestReview>
           <FAQ></FAQ>
           <Newsletter></Newsletter>
           {/* <AllProperties></AllProperties> */}
        </div>
    );
};

export default Home;