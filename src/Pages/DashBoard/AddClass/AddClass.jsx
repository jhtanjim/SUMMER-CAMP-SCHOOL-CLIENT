import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

import { BookOpen, DollarSign, Mail, Upload, User, Users } from "lucide-react";

const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imgResponse = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });

      const imgResult = await imgResponse.json();

      if (imgResult.success) {
        const imgUrl = imgResult.data.display_url;
        const { name, seat, price, instructor, email } = data;

        const newClass = {
          name,
          price: parseFloat(price),
          seat: parseInt(seat),
          image: imgUrl,
          instructor,
          email,
          userImage: user?.photoURL || "",
          statusbar: "pending",
          feedback: "",
          enrolled: 0,
        };

        const response = await axiosSecure.post("/class", newClass);

        if (response.data.insertedId) {
          reset();
          Swal.fire({
            title: "Success!",
            text: "Class added successfully",
            icon: "success",
            confirmButtonColor: "#8B5CF6",
          });
        }
      }
    } catch (error) {
      console.error("Error adding class:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add class. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionTitle subHeading="Create New" heading="Add Class" />

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Class Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
                Class Name *
              </label>
              <input
                type="text"
                placeholder="Enter class name"
                {...register("name", {
                  required: "Class name is required",
                  maxLength: 120,
                })}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.name ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Class Image */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Upload className="h-4 w-4 mr-2 text-purple-500" />
                Class Image *
              </label>
              <input
                {...register("image", { required: "Class image is required" })}
                type="file"
                accept="image/*"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.image ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Instructor Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 mr-2 text-purple-500" />
                  Instructor Name
                </label>
                <input
                  type="text"
                  {...register("instructor", { required: true })}
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 mr-2 text-purple-500" />
                  Instructor Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            {/* Seats and Price */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Users className="h-4 w-4 mr-2 text-purple-500" />
                  Available Seats *
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter available seats"
                  {...register("seat", {
                    required: "Available seats is required",
                    min: 1,
                  })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.seat ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.seat && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.seat.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="h-4 w-4 mr-2 text-purple-500" />
                  Price *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter price"
                  {...register("price", {
                    required: "Price is required",
                    min: 0,
                  })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.price ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding Class...
                  </>
                ) : (
                  "Add Class"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
