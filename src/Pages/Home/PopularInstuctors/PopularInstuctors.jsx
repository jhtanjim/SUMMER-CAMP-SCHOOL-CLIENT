import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const PopularInstuctors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://summer-camp-school-server-jhtanjim.vercel.app/users"
        );
        const data = await response.json();
        const filteredInstructors = data
          .filter((item) => item.role === "instuctor")
          .slice(0, 6); // get top 6 instructors
        setInstructors(filteredInstructors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-10 px-4 max-w-screen-xl mx-auto">
      <SectionTitle
        subHeading="Popular Instructor"
        heading="Popular Instructor"
      />

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {instructors.map((instructor) => (
          <div
            key={instructor._id}
            className="card w-full bg-base-100 border-x-4 border-[#05345E] shadow-xl hover:bg-[#05345E] hover:text-white hover:border hover:border-black rounded-xl text-sm font-semibold transition duration-300 transform hover:scale-105"
          >
            <div className="avatar mx-auto mt-8 mb-4">
              <div className="w-24 rounded-full ring ring-[#05345E] ring-offset-[#05345E] hover:ring-white hover:ring-offset-4 ring-offset-3">
                <img src={instructor.image} alt={instructor.name} />
              </div>
            </div>

            <div className="text-center px-4 pb-6">
              <p className="text-lg font-medium">{instructor.name}</p>
              <p className="flex items-center justify-center gap-2 text-sm opacity-90 mt-2 flex-wrap">
                <FaEnvelope className="text-xs" />{" "}
                <span>{instructor.email}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstuctors;
