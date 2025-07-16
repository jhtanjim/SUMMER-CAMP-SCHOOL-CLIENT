import { Outlet } from "react-router-dom";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";
import Footer from "../Pages/Shared/Footer/Footer";
import Header from "../Pages/Shared/Header/Header";

const Main = () => {
  return (
    <div>
      <ScrollToTop />

      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
