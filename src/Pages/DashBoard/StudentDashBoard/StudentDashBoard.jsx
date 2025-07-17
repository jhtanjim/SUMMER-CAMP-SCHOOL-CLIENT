import { BookOpen, Calendar, DollarSign } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { AuthContext } from "../../../Providers/AuthProvider";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await fetch(
          "https://summer-camp-school-server-jhtanjim.vercel.app/payments"
        );
        const data = await response.json();
        const userHistory = data
          .filter((payment) => payment.email === user.email)
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setHistory(userHistory);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchPaymentHistory();
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <Helmet>
        <title>Bajao | Student Dashboard</title>
      </Helmet>

      <div className="container mx-auto px-4">
        <SectionTitle
          heading="Student Dashboard"
          subHeading="Welcome to your learning journey"
        />

        {/* Enrolled Classes Section */}
        <div className="mt-10 mb-16">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            📚 Enrolled Classes
          </h2>
          {history.length === 0 ? (
            <div className="text-center py-10">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">
                You haven't enrolled in any classes yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
              <table className="w-full">
                <thead className="bg-purple-600 text-white text-left text-sm">
                  <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Class</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {history.map((item, idx) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium">{idx + 1}</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={item.itemsImage || "/placeholder.svg"}
                          className="w-14 h-14 object-cover rounded-md"
                          alt={item.itemNames}
                        />
                        <div>
                          <div className="font-semibold">{item.itemNames}</div>
                          <div className="text-xs text-gray-500">
                            Transaction ID: {item.transactionId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 text-purple-500 mr-2" />
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-bold text-purple-600 flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {item.price}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 text-xs rounded-full">
                          Enrolled
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Payment History Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            💳 Payment History
          </h2>
          {history.length === 0 ? (
            <div className="text-center py-10">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No payment records found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
              <table className="w-full">
                <thead className="bg-blue-600 text-white text-left text-sm">
                  <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Items</th>
                    <th className="px-6 py-3">Transaction ID</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {history.map((item, idx) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium">{idx + 1}</td>
                      <td className="px-6 py-4">{item.itemNames}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {item.transactionId}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-bold text-green-600">
                        ${item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
