import React, { useEffect, useState } from "react";
import Cover from "../Cover/Cover";
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
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCarts from "../../../Hooks/useCarts/useCarts";
import { useContext } from "react";
import UseAdmin from "../../../Hooks/UseAdmin";
import UseInstructor from "../../../Hooks/UseInstuctor";

const Classes = () => {
  const [classes] = UseClass();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [, refetch] = useCarts();
  const location = useLocation();
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [numOfStudent, setNumOfStudent] = useState({});

  const [isAdmin] = UseAdmin();
  const [isInstructor] = UseInstructor();

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

  const handleSelect = (classItem) => {
    if (user && user.email) {
      const selectItem = {
        classItem: classItem._id,
        name: classItem.name,
        image: classItem.image,
        email: user.email,
        price: classItem.price,
      };

      fetch("https://summer-camp-school-server-jhtanjim.vercel.app/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            setSelectedClasses((prevSelectedClasses) => [
              ...prevSelectedClasses,
              classItem._id,
            ]);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Class has been Added",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Login to Select the Class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <Cover
        img="https://i.ibb.co/C9ZvJLF/pexels-mart-production-8471826.jpg"
        title="Music Classes"
      />
      <div className="max-w-screen-2xl mx-4 lg:mx-auto">
        <Helmet>
          <title>Bajao | Classes</title>
        </Helmet>

        <div className="my-20 grid gap-12 xl:grid-cols-4  mx-12">
          {classes.map(
            (classItem) =>
              classItem.statusbar === "approved" && (
                <div
                  key={classItem._id}
                  className="card w-[350px] bg-base-100 shadow-xl"
                >
                  <figure>
                    <img
                      className="h-40 w-full"
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
                    <button
                      onClick={() => handleSelect(classItem)}
                      className="btn btn-primary mt-3 font-bold text-xl"
                      disabled={
                        isAdmin ||
                        isInstructor ||
                        selectedClasses.includes(classItem._id)
                      }
                    >
                      {selectedClasses.includes(classItem._id)
                        ? "Selected"
                        : "Select"}
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Classes;
