import React from 'react';
import Banner from '../Banner/Banner';
import { Helmet } from 'react-helmet-async';
import PopularClass from '../PopularClass/PopularClass';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Summer Camp | Home</title>

            </Helmet>
            <Banner></Banner>
            <PopularClass></PopularClass>
        </div>
    );
};

export default Home;