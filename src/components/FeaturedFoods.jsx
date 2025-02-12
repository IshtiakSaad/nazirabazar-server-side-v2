import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchFeaturedFoods = async () => {
  const { data } = await axios.get("https://nazirabazar-server.vercel.app/foods");
  return data.sort((a, b) => b.foodQuantity - a.foodQuantity).slice(0, 6);
};

const FeaturedFoods = () => {
  const {
    data: featuredFoods,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featuredFoods"], // Use an array for the query key
    queryFn: fetchFeaturedFoods, // Specify the fetch function
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          {/* Loading Text */}
          <p className="text-lg text-gray-600 mt-4">Loading Featured Foods...</p>
        </div>
      </div>
    );
  if (isError) return <p>Error fetching featured foods.</p>;

  return (
    <section className="max-w-7xl mx-auto py-12">
      <h2 className="text-5xl text-center font-extrabold text-gray-100 mb-12 tracking-wide">
        Featured Foods
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredFoods.map((food) => (
          <div
            key={food._id}
            className="relative bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-white mb-3">
                {food.foodName}
              </h3>
              <p className="text-gray-300 mb-2">
                <strong>Quantity:</strong> {food.foodQuantity}
              </p>
              <p className="text-gray-300 mb-2">
                <strong>Pickup Location:</strong> {food.pickupLocation}
              </p>
              <p className="text-gray-300 mb-4">
                <strong>Expires On:</strong>{" "}
                {new Date(food.expiredDateTime).toLocaleString()}
              </p>
              <Link
                to={`/foods/${food._id}`}
                className="inline-block px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-md hover:from-indigo-600 hover:to-purple-700 transition-all"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedFoods;
