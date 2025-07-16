import { Calendar, ShoppingCart, Star, User, Users } from "lucide-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAdmin from "../../../Hooks/UseAdmin";
import useCarts from "../../../Hooks/useCarts/useCarts";
import UseClass from "../../../Hooks/UseClass/UseClass";
import UseInstructor from "../../../Hooks/UseInstuctor";
import { AuthContext } from "../../../Providers/AuthProvider";
import Cover from "../Cover/Cover";

const Classes = () => {
  const [classes] = UseClass();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [, refetch] = useCarts();
  const location = useLocation();
  const [selectedClasses, setSelectedClasses] = useState(new Set());
  const [numOfStudent, setNumOfStudent] = useState({});
  const [isAdmin] = UseAdmin();
  const [isInstructor] = UseInstructor();
  const [loading, setLoading] = useState(false);

  // Memoize approved classes to avoid unnecessary re-renders
  const approvedClasses = useMemo(
    () => classes.filter((classItem) => classItem.statusbar === "approved"),
    [classes]
  );

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await fetch(
          "https://summer-camp-school-server-jhtanjim.vercel.app/payments"
        );
        const data = await response.json();
        const studentCount = data.reduce((count, item) => {
          count[item.itemNames] = (count[item.itemNames] || 0) + 1;
          return count;
        }, {});
        setNumOfStudent(studentCount);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    fetchStudentCount();
  }, []);

  const handleSelect = useCallback(
    async (classItem) => {
      if (!user?.email) {
        const result = await Swal.fire({
          title: "Please Login to Select the Class",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#8B5CF6",
          cancelButtonColor: "#EF4444",
          confirmButtonText: "Login Now",
          customClass: {
            popup: "rounded-xl",
            confirmButton: "rounded-lg",
            cancelButton: "rounded-lg",
          },
        });

        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
        return;
      }

      setLoading(true);
      const selectItem = {
        classItem: classItem._id,
        name: classItem.name,
        image: classItem.image,
        email: user.email,
        price: classItem.price,
      };

      try {
        const response = await fetch(
          "https://summer-camp-school-server-jhtanjim.vercel.app/carts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectItem),
          }
        );

        const data = await response.json();

        if (data.insertedId) {
          refetch();
          setSelectedClasses((prev) => new Set([...prev, classItem._id]));

          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Class Added Successfully!",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: "rounded-xl",
            },
          });
        }
      } catch (error) {
        console.error("Error adding class:", error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Please try again later.",
          customClass: {
            popup: "rounded-xl",
          },
        });
      } finally {
        setLoading(false);
      }
    },
    [user, navigate, location, refetch]
  );

  const isClassDisabled = useCallback(
    (classItem) => {
      return (
        isAdmin ||
        isInstructor ||
        selectedClasses.has(classItem._id) ||
        classItem.seat <= 0
      );
    },
    [isAdmin, isInstructor, selectedClasses]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <Cover
        img="https://i.ibb.co/C9ZvJLF/pexels-mart-production-8471826.jpg"
        title="Music Classes"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Helmet>
          <title>Bajao | Classes</title>
        </Helmet>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Your Musical Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated selection of music classes taught
            by expert instructors
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {approvedClasses.map((classItem) => (
            <div
              key={classItem._id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  src={classItem.image || "/placeholder.svg"}
                  alt={classItem.name}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${classItem.price}
                </div>

                {/* Rating */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">4.8</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {classItem.name}
                </h3>

                {/* Instructor Info */}
                <div className="flex items-center mb-4 text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">
                    {classItem.instructor}
                  </span>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Students</span>
                    </div>
                    <span className="font-semibold text-purple-600">
                      {numOfStudent[classItem.name] || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Available Seats</span>
                    </div>
                    <span
                      className={`font-semibold ${
                        classItem.seat <= 5 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {classItem.seat}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleSelect(classItem)}
                  disabled={isClassDisabled(classItem) || loading}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isClassDisabled(classItem)
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
                      <span>
                        {selectedClasses.has(classItem._id)
                          ? "Selected"
                          : isAdmin
                          ? "Admin Access"
                          : isInstructor
                          ? "Instructor Access"
                          : classItem.seat <= 0
                          ? "Fully Booked"
                          : "Select Class"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {approvedClasses.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Classes Available
            </h3>
            <p className="text-gray-600">
              Check back soon for new music classes!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;
