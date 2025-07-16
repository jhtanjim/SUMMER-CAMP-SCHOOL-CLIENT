import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-screen-xl mx-4 lg:mx-auto my-20 lg:flex items-center gap-8">
      {/* Image Section */}
      <div>
        <img
          className="rounded-lg shadow-2xl max-w-lg lg:max-w-xl"
          src="https://i.ibb.co/t47BJrc/pexels-kampus-production-8154333.jpg"
          alt="Music student"
        />
      </div>

      {/* Content Section */}
      <div>
        <h2 className="text-orange-500 font-bold text-xl">About Us</h2>
        <h1 className="text-4xl font-extrabold my-2 text-[#05345E]">
          Learn The Music From The Core & Become Mastery
        </h1>
        <p className="text-sm font-semibold opacity-60 my-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          sequi nesciunt illo, quisquam, minus molestiae praesentium
          exercitationem in quis cupiditate repellat deleniti id? Ducimus,
          officiis error quod velit iusto voluptatem!
        </p>

        <Link to="/login">
          <button className="mt-4 bg-[#05345E] text-white hover:bg-[#F86518] py-2 px-6 rounded text-xs lg:text-xl font-semibold transition duration-300 transform hover:scale-105">
            Explore Services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
