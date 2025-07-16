import { DollarSign, Edit, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useCarts from "../../../Hooks/useCarts/useCarts";

const MySelectedClass = () => {
  const [cart, refetch, isLoading] = useCarts();
  const [actionLoading, setActionLoading] = useState(false);

  const total = cart.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      setActionLoading(true);
      try {
        const response = await fetch(
          `https://summer-camp-school-server-jhtanjim.vercel.app/carts/${item._id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();

        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Removed!",
            text: "Class has been removed from cart.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Error removing class:", error);
      } finally {
        setActionLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <Helmet>
        <title>Bajao | My Selected Classes</title>
      </Helmet>

      <div className="container mx-auto px-4">
        <SectionTitle subHeading="My Cart" heading="Selected Classes" />

        {/* Cart Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-purple-600">
                  {cart.length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Price</p>
                <p className="text-2xl font-bold text-green-600">
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>

            {cart.length > 0 && (
              <Link
                to="/dashboard/payment"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              >
                <DollarSign className="h-5 w-5" />
                <span>Proceed to Payment</span>
              </Link>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Add some classes to get started!
            </p>
            <Link
              to="/classes"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Browse Classes
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Class
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cart.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              Selected for learning
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-purple-600">
                          ${item.price}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(item)}
                            disabled={actionLoading}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
                            title="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <Link
                            to="/dashboard/payment"
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
                          >
                            <DollarSign className="h-4 w-4" />
                            <span>Pay</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySelectedClass;
