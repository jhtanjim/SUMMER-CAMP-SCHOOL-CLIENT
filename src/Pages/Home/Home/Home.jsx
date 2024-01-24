import React from "react";
import Banner from "../Banner/Banner";
import { Helmet } from "react-helmet-async";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstuctors from "../PopularInstuctors/PopularInstuctors";
import About from "../About/About";
import Services from "../Services/Services";

const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title>Bajao | Home</title>
      </Helmet>
      <Banner></Banner>

      <About></About>
      <Services />
      <PopularClass></PopularClass>
      <PopularInstuctors></PopularInstuctors>
    </div>
  );
};

export default Home;
