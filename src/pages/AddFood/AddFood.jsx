import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    foodName: "",
    foodImage: "",
    foodQuantity: "",
    pickupLocation: "",
    expiredDateTime: "",
    additionalNotes: "",
    foodStatus: "available",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foodData = {
      ...formData,
      donator: {
        name: user?.displayName || "Anonymous",
        email: user?.email || "N/A",
        image: user?.photoURL,
      },
    };

    try {
      const response = await fetch("https://nazirabazar-server.vercel.app/foods/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodData),
      });

      if (response.ok) {
        toast.success("Food added successfully!");
        navigate(`/available-foods/`);
        setFormData({
          foodName: "",
          foodImage: "",
          foodQuantity: "",
          pickupLocation: "",
          expiredDateTime: "",
          additionalNotes: "",
          foodStatus: "available",
        });
      } else {
        throw new Error("Failed to add food.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center rounded-lg min-h-screen bg-base-100 px-4 py-12">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-extrabold text-center text-white mb-8">
          Add Food
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="foodName"
              className="block text-sm font-medium text-gray-300"
            >
              Food Name
            </label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              placeholder="Enter food name"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="foodImage"
              className="block text-sm font-medium text-gray-300"
            >
              Food Image (URL)
            </label>
            <input
              type="text"
              id="foodImage"
              name="foodImage"
              value={formData.foodImage}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>
          <div>
            <label
              htmlFor="foodQuantity"
              className="block text-sm font-medium text-gray-300"
            >
              Food Quantity
            </label>
            <input
              type="text"
              id="foodQuantity"
              name="foodQuantity"
              value={formData.foodQuantity}
              onChange={handleChange}
              placeholder="e.g., 2 servings"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="pickupLocation"
              className="block text-sm font-medium text-gray-300"
            >
              Pickup Location
            </label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="Enter pickup location"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="expiredDateTime"
              className="block text-sm font-medium text-gray-300"
            >
              Expired Date/Time
            </label>
            <input
              type="datetime-local"
              id="expiredDateTime"
              name="expiredDateTime"
              value={formData.expiredDateTime}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="additionalNotes"
              className="block text-sm font-medium text-gray-300"
            >
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Add any notes about the food..."
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transition-transform transform hover:scale-105"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
