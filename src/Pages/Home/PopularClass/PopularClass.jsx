import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import UseClass from "../../../Hooks/UseClass/UseClass";
import {
  FaCalendarPlus,
  FaChair,
  FaDollarSign,
  FaIdBadge,
  FaList,
  FaMusic,
} from "react-icons/fa";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useCarts from "../../../Hooks/useCarts/useCarts";
import { useContext } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const PopularClass = () => {
  const [classes] = UseClass();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [, refetch] = useCarts();
  const location = useLocation();
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [numOfStudent, setNumOfStudent] = useState({});
  const [topClasses, setTopClasses] = useState([]);

  useEffect(() => {
    fetch("https://summer-camp-school-server-jhtanjim.vercel.app/payments")
      .then((res) => res.json())
      .then((data) => {
        const studentCount = data.reduce((count, item) => {
          if (count[item.itemNames]) {
            count[item.itemNames] += 1;
          } else {
            count[item.itemNames] = 1;
          }
          return count;
        }, {});
        setNumOfStudent(studentCount);
      });
  }, []);

  useEffect(() => {
    const sortedClasses = [...classes].sort((a, b) => {
      const numOfStudentsA = numOfStudent[a.name] || 0;
      const numOfStudentsB = numOfStudent[b.name] || 0;
      return numOfStudentsB - numOfStudentsA;
    });
    setTopClasses(sortedClasses.slice(0, 6));
  }, [classes, numOfStudent]);

  return (
    <div>
      <div className="max-w-screen-xl lg:mx-auto mx-4">
        <SectionTitle
          subHeading="Popular Class"
          heading="Popular Class"
        ></SectionTitle>
        <div className="grid lg:grid-cols-3 gap-12">
          {topClasses.map(
            (classItem) =>
              classItem.statusbar === "approved" && (
                <div
                  key={classItem._id}
                  className="card w-[400px] bg-base-100 shadow-xl"
                >
                  <figure>
                    <img
                      className="h-48 w-full"
                      src={classItem.image}
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="font-bold text-2xl">{classItem.name}</h2>
                    <h2 className="text-xs font-semibold opacity-90">
                      Price: {classItem.price}
                    </h2>
                    <h2 className="text-xs font-semibold opacity-90">
                      Instructor:{classItem.instructor}
                    </h2>
                    <h2 className="text-xs font-semibold opacity-90">
                      Available Seat:{classItem.seat}
                    </h2>
                    <p className="text-sm">
                      Number of Students: {numOfStudent[classItem.name] || 0}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularClass;
