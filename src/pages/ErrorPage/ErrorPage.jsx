import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <div className="text-center backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg p-10 shadow-lg">
        <h1 className="text-8xl font-extrabold text-red-500">404</h1>
        <p className="text-2xl mt-4 text-gray-300">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;