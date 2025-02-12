import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [sortedFoods, setSortedFoods] = useState([]);
  const [layoutColumns, setLayoutColumns] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("https://nazirabazar-server.vercel.app/foods");
        const data = await res.json();
        setFoods(data);
        setSortedFoods(data.filter((food) => food.foodStatus === "available"));
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      }
    };

    fetchFoods();
  }, []);

  const sortFoodsByExpireDate = () => {
    const sorted = [...sortedFoods].sort(
      (a, b) => new Date(a.expiredDateTime) - new Date(b.expiredDateTime)
    );
    setSortedFoods(sorted);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredFoods = foods.filter(
      (food) =>
        food.foodStatus === "available" &&
        food.foodName.toLowerCase().includes(query)
    );
    setSortedFoods(filteredFoods);
  };

  const toggleLayout = () => {
    setLayoutColumns(layoutColumns === 3 ? 2 : 3);
  };

  return (
    <div className="min-h-screen rounded-lg bg-base-100 px-6 py-12">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-center text-white mb-12">
        Explore Available Foods
      </h1>

      {/* Controls */}
      <div className="max-w-7xl mx-auto flex flex-col  sm:flex-row items-center justify-between gap-6 mb-12">
        <input
          type="text"
          placeholder="Search by food name..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full sm:w-1/2 px-4 py-2 text-white bg-white/10 border border-white/20 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={toggleLayout}
          className="hidden lg:block px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-transform transform hover:scale-105"
        >
          {layoutColumns === 3 ? "View 2 Column" : "View 3 Column"}
        </button>
        <button
          onClick={sortFoodsByExpireDate}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-transform transform hover:scale-105"
        >
          Sort by Expiry Date
        </button>
      </div>

      {/* Food Cards */}
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${layoutColumns} gap-8`}
      >
        {sortedFoods.map((food) => (
          <div
            key={food._id}
            className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={food.foodImage || "https://via.placeholder.com/300"}
              alt={food.foodName}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white truncate mb-3">
                {food.foodName}
              </h2>
              <p className="text-sm text-gray-300 mb-2">
                <strong>Quantity:</strong> {food.foodQuantity}
              </p>
              <p className="text-sm text-gray-300 mb-2">
                <strong>Pickup Location:</strong> {food.pickupLocation}
              </p>
              <p className="text-sm text-gray-300 mb-2">
                <strong>Expires On:</strong>{" "}
                {new Date(food.expiredDateTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400 italic mb-4">
                {food.additionalNotes}
              </p>
              <button
                onClick={() => navigate(`/foods/${food._id}`)}
                className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md shadow-lg hover:from-purple-600 hover:to-indigo-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFoods;
