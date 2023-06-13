import React from 'react';
import Banner from '../Banner/Banner';
import { Helmet } from 'react-helmet-async';
import PopularClass from '../PopularClass/PopularClass';
import PopularInstuctors from '../PopularInstuctors/PopularInstuctors';
import About from '../About/About';


const Home = () => {
    return (
        <div className='w-full' >
            <Helmet>
                <title>Bajao | Home</title>
            </Helmet>
            <Banner></Banner>
            <About></About>
            <PopularClass></PopularClass>
            <PopularInstuctors></PopularInstuctors>

        </div>
    );
};

export default Home;