import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseClass from "../../../Hooks/UseClass/UseClass";
import useCarts from "../../../Hooks/useCarts/useCarts";
import { AuthContext } from "../../../Providers/AuthProvider";

const PopularClass = () => {
  const [classes] = UseClass();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [, refetch] = useCarts();
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
      const numA = numOfStudent[a.name] || 0;
      const numB = numOfStudent[b.name] || 0;
      return numB - numA;
    });
    setTopClasses(sortedClasses.slice(0, 6));
  }, [classes, numOfStudent]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <SectionTitle subHeading="Popular Class" heading="Popular Class" />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topClasses.map(
          (classItem) =>
            classItem.statusbar === "approved" && (
              <div
                key={classItem._id}
                className="card w-full bg-base-100 shadow-xl transition duration-300 hover:shadow-2xl"
              >
                <figure>
                  <img
                    className="h-48 w-full object-cover"
                    src={classItem.image}
                    alt={classItem.name}
                  />
                </figure>
                <div className="card-body space-y-2">
                  <h2 className="font-bold text-xl">{classItem.name}</h2>
                  <p className="text-sm font-medium text-gray-600">
                    Instructor: {classItem.instructor}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    Available Seats: {classItem.seat}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    Price: ${classItem.price}
                  </p>
                  <p className="text-sm text-gray-700">
                    Number of Students: {numOfStudent[classItem.name] || 0}
                  </p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default PopularClass;
