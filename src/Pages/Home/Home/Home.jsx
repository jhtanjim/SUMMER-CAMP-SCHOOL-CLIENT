import { Helmet } from "react-helmet-async";
import About from "../About/About";
import Banner from "../Banner/Banner";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstuctors from "../PopularInstuctors/PopularInstuctors";
import Services from "../Services/Services";

const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title>Bajao | Home</title>
      </Helmet>
      <Banner></Banner>
      <div className="container mx-auto">
        <About></About>
        <Services />
        <PopularClass></PopularClass>
        <PopularInstuctors></PopularInstuctors>
      </div>
    </div>
  );
};

export default Home;
