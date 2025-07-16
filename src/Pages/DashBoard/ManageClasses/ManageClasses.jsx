import { Check, Eye, MessageSquare, X } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseClass from "../../../Hooks/UseClass/UseClass";

const ManageClasses = () => {
  const [classes, , , refetch] = UseClass();
  const [loading, setLoading] = useState(false);

  const handleApproved = async (classItem) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://summer-camp-school-server-jhtanjim.vercel.app/class/approved/${classItem._id}`,
        { method: "PATCH" }
      );
      const data = await response.json();

      if (data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Approved!",
          text: "Class has been approved successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error approving class:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeny = async (classItem) => {
    const { value: feedback } = await Swal.fire({
      title: "Deny Class",
      input: "textarea",
      inputLabel: "Feedback (required)",
      inputPlaceholder: "Please provide feedback for denial...",
      inputValidator: (value) => {
        if (!value) {
          return "Feedback is required!";
        }
      },
      showCancelButton: true,
      confirmButtonText: "Deny Class",
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
    });

    if (feedback) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://summer-camp-school-server-jhtanjim.vercel.app/class/deny/${classItem._id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ feedback }),
          }
        );
        const data = await response.json();

        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Denied!",
            text: "Class has been denied with feedback",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Error denying class:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <SectionTitle subHeading="Admin Panel" heading="Manage Classes" />

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Class Info
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Instructor
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {classes.map((item, index) => (
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
                            Seats: {item.seat}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">
                          {item.instructor}
                        </p>
                        <p className="text-gray-500">{item.email}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-purple-600">
                        ${item.price}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          item.statusbar === "approved"
                            ? "bg-green-100 text-green-800"
                            : item.statusbar === "deny"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.statusbar}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {item.statusbar === "pending" ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproved(item)}
                            disabled={loading}
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
                            title="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeny(item)}
                            disabled={loading}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
                            title="Deny"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {item.feedback && (
                            <button
                              onClick={() =>
                                Swal.fire({
                                  title: "Feedback",
                                  text: item.feedback,
                                  icon: "info",
                                })
                              }
                              className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
                              title="View Feedback"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClasses;
