import { BookOpen, Calendar, DollarSign } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { AuthContext } from "../../../Providers/AuthProvider";

const MyEnrolledClass = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const response = await fetch(
          "https://summer-camp-school-server-jhtanjim.vercel.app/payments"
        );
        const data = await response.json();

        const filteredHistory = data.filter(
          (payment) => payment.email === user.email
        );
        const sortedHistory = filteredHistory.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setHistory(sortedHistory);
      } catch (error) {
        console.error("Error fetching enrolled classes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchEnrolledClasses();
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <Helmet>
        <title>Bajao | My Enrolled Classes</title>
      </Helmet>

      <div className="container mx-auto px-4">
        <SectionTitle subHeading="My Learning" heading="Enrolled Classes" />

        {history.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Enrolled Classes
            </h3>
            <p className="text-gray-500">
              You haven't enrolled in any classes yet.
            </p>
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
                      Enrollment Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {history.map((classItem, index) => (
                    <tr
                      key={classItem._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={classItem.itemsImage || "/placeholder.svg"}
                            alt={classItem.itemNames}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">
                              {classItem.itemNames}
                            </h3>
                            <p className="text-xs text-gray-500">
                              Transaction ID: {classItem.transactionId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                          {new Date(classItem.date).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center text-lg font-bold text-purple-600">
                          <DollarSign className="h-4 w-4" />
                          {classItem.price}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Enrolled
                        </span>
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

export default MyEnrolledClass;
