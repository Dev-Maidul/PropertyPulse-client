import React from 'react';
import Banner from './Banner';
import AllProperties from '../AllProperties/AllProperties';
import AdvertisedSection from './AdvertisedSection';
import LatestReview from './LatestReview';
import WhyChooseUs from './WhyChooseUs';
import HowItWorks from './HowItWorks';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <AdvertisedSection></AdvertisedSection>
           
           <WhyChooseUs></WhyChooseUs>
           <HowItWorks></HowItWorks>
           <LatestReview></LatestReview>
           {/* <AllProperties></AllProperties> */}
        </div>
    );
};

export default Home;