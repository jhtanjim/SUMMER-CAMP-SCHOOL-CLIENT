"use client";
import Cover from "../Cover/Cover";

import { Award, Mail, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";

const InstructorData = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Cover
        img="https://i.ibb.co/VJZ8sgd/pexels-kindel-media-7149181.jpg"
        title="Our Instructors"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Meet Our Expert Instructors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn from passionate professionals who are dedicated to helping you
            achieve your musical goals
          </p>
        </div>

        {instructors.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Instructors Available
            </h3>
            <p className="text-gray-600">
              Check back soon for our amazing instructors!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {instructors.map((instructor) => (
              <div
                key={instructor._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                {/* Profile Image */}
                <div className="relative p-8 pb-4">
                  <div className="relative mx-auto w-32 h-32">
                    <img
                      src={
                        instructor.image ||
                        "/placeholder.svg?height=128&width=128"
                      }
                      alt={instructor.name}
                      className="w-full h-full object-cover rounded-full ring-4 ring-purple-100 group-hover:ring-purple-200 transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Online Status */}
                    <div className="absolute bottom-2 right-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-8 pb-8 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                    {instructor.name}
                  </h3>

                  <div className="flex items-center justify-center mb-4 text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">{instructor.email}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                      </div>
                      <p className="text-sm font-semibold text-gray-800">4.9</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-4 w-4 text-blue-500" />
                      </div>
                      <p className="text-sm font-semibold text-gray-800">
                        150+
                      </p>
                      <p className="text-xs text-gray-500">Students</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Award className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-sm font-semibold text-gray-800">5+</p>
                      <p className="text-xs text-gray-500">Years</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {/* <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105">
                      View Profile
                    </button>
                    <button className="w-full border border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold py-2 px-4 rounded-xl transition-all duration-200">
                      Contact
                    </button>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorData;
