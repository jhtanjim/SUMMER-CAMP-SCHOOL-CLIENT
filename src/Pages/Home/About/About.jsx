// import React from "react";
// import { motion } from "framer-motion";
// import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

// const About = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 1,
//       },
//     },
//   };

//   const imageVariants = {
//     hidden: { opacity: 0, x: -100 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         delay: 0.5,
//         duration: 1,
//       },
//     },
//   };

//   const textVariants = {
//     hidden: { opacity: 0, x: 100 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         delay: 0.5,
//         duration: 1,
//       },
//     },
//   };

//   return (
//     <div>
//       <SectionTitle subHeading="Our Introductions" heading="Welcome to Bajao" />
//       <div className="hero min-h-min">
//         <motion.div
//           className="hero-content flex-col lg:flex-row"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.img
//             src="https://i.ibb.co/0BMhmVW/pexels-rdne-stock-project-8082778.jpg"
//             className="lg:max-w-xl max-w-lg rounded-lg shadow-2xl"
//             alt="About Image"
//             variants={imageVariants}
//           />
//           <motion.div className="ms-16" variants={textVariants}>
//             <p className="text-2xl text-purple-900 font-semibold">
//               Our Introductions
//             </p>
//             <h1 className="text-5xl font-bold mt-4">Welcome to Bajao</h1>
//             <ul className="list-disc pl-6 my-4">
//               <li className="text-2xl font-semibold text-blue-950">
//                 Refreshing to get such a personal touch.
//               </li>
//               <li className="text-2xl font-semibold text-blue-950">
//                 Duis aute irure dolor in reprehenderit in voluptate.
//               </li>
//               <li className="text-2xl font-semibold text-blue-950">
//                 Velit esse cillum dolore eu fugiat nulla pariatur.
//               </li>
//             </ul>
//             <button className="btn btn-primary">Get Started</button>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default About;

import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-screen-xl lg:flex  gap-8 lg:mx-auto mx-4 items-center my-20">
      {/* image */}
      <div>
        <img
          className="lg:max-w-xl rounded-lg shadow-2xl"
          src="https://i.ibb.co/t47BJrc/pexels-kampus-production-8154333.jpg"
          alt=""
        />
      </div>
      {/* ?content */}
      <div>
        <h2 className="text-xl font-bold text-orange-500">About Us</h2>
        <h2 className="text-4xl font-extrabold my-2">
          Learn The Music From The Core & Become Mastery
        </h2>
        <p className="text-sm font-semibold opacity-50 my-4 ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          sequi nesciunt illo, quisquam, minus molestiae praesentium
          exercitationem in quis cupiditate repellat deleniti id? Ducimus,
          officiis error quod velit iusto voluptatem!
        </p>

        <Link to="login">
          {" "}
          <button className="bg-[#05345E] text-[#FFFFFF] hover:bg-[#F86518] py-2 px-6 rounded lg:text-xl text-xs  font-semibold transition duration-300 ease-in-out transform hover:scale-105 mt-4">
            Explore Services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
