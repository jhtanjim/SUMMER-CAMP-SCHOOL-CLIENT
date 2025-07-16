import { Link } from "react-router-dom";

const UnderConstruction = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-100 px-4">
      <div className="text-center">
        <img
          className="w-64 mx-auto mb-6"
          src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?size=626&ext=jpg&ga=GA1.2.2105197794.1682091372&semt=ais"
          alt="404 - Not Found"
        />
        <h1 className="text-3xl font-bold text-orange-600 mb-2">
          Uh-oh! Page Not Found
        </h1>
        <p className="text-gray-700 mb-4">
          It looks like you wandered off the summer camp trail. Let’s head back!
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-full transition"
        >
          Back to Camp Home
        </Link>
      </div>
    </div>
  );
};

export default UnderConstruction;
