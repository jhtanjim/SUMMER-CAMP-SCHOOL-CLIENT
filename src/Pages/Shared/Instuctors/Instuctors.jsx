import React, { useEffect, useState } from "react";
import Cover from "../Cover/Cover";
import { FaEnvelope } from "react-icons/fa";

const InstructorData = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://summer-camp-school-server-jhtanjim.vercel.app/users"
        );
        const data = await response.json();
        const filteredInstructors = data.filter(
          (item) => item.role === "instuctor"
        );
        setInstructors(filteredInstructors);
        console.log(filteredInstructors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Cover
        img="https://i.ibb.co/VJZ8sgd/pexels-kindel-media-7149181.jpg"
        title="Instructor"
      />

      <div className="">
        {instructors.map((instructor) => (
          <div className="max-w-screen-xl mx-auto ">
            <div className="grid lg:grid-cols-3">
              {instructors.map((instructor) => (
                <div
                  key={instructor._id}
                  className="card my-4   lg:w-80 md:w-72 bg-base-100  border-x-4  border-[#05345E] shadow-xl  hover:bg-[#05345E] hover:text-white
                       hover:border  hover:border-black
                         rounded-xl text-sm font-semibold transition duration-300  ease-in-out transform hover:scale-105"
                >
                  <div className="avatar mx-auto mt-8 mb-4  ">
                    <div className="w-24 rounded-full ring ring-[#05345E] ring-offset-[#05345E] hover:ring-white hover:ring-offset-4 ring-offset-3">
                      <img src={instructor.image} />
                    </div>
                  </div>

                  <div className=" text-center">
                    <p>{instructor.name}</p>
                    <p className="flex gap-1 font-xs  opacity-90 lg:mx-8 mb-8">
                      <FaEnvelope /> <span> {instructor.email}</span>
                    </p>
                    {/* social */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorData;
