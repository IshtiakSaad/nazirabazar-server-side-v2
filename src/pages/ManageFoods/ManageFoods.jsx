import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext/AuthContext";

const ManageMyFoods = () => {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch("https://nazirabazar-server.vercel.app/foods");
        const data = await response.json();
        const userFoods = data.filter(
          (food) => food.donator.email === currentUser.user.email
        );
        setFoods(userFoods);
      } catch (error) {
        console.error("Error fetching foods:", error);
        toast.error("Failed to fetch foods.");
      }
    };

    fetchFoods();
  }, [currentUser.user.email]);

  const handleDeleteFood = async (foodId) => {
    if (window.confirm("Are you sure you want to delete this food?")) {
      try {
        await fetch(`https://nazirabazar-server.vercel.app/foods/${foodId}`, {
          method: "DELETE",
        });
        setFoods(foods.filter((food) => food._id !== foodId));
        toast.success("Food deleted successfully!");
      } catch (error) {
        console.error("Error deleting food:", error);
        toast.error("Failed to delete food.");
      }
    }
  };

  const handleUpdateNavigate = (foodId) => {
    navigate(`/update-food/${foodId}`);
  };

  return (
    <div className="min-h-screen bg-base-100 px-6 py-12 flex flex-col items-center">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8 w-full max-w-5xl">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          Manage My Foods
        </h1>

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-white border-collapse">
            <thead>
              <tr className="bg-white/10">
                <th className="border border-white/20 px-6 py-3">Name</th>
                <th className="border border-white/20 px-6 py-3">Quantity</th>
                <th className="border border-white/20 px-6 py-3">
                  Pickup Location
                </th>
                <th className="border border-white/20 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.length > 0 ? (
                foods.map((food) => (
                  <tr
                    key={food._id}
                    className="bg-white/5 hover:bg-white/10 transition"
                  >
                    <td className="border border-white/20 px-6 py-4">
                      {food.foodName}
                    </td>
                    <td className="border border-white/20 px-6 py-4">
                      {food.foodQuantity}
                    </td>
                    <td className="border border-white/20 px-6 py-4">
                      {food.pickupLocation}
                    </td>
                    <td className="border border-white/20 px-6 py-4">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 mr-2"
                        onClick={() => handleUpdateNavigate(food._id)}
                      >
                        Update
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                        onClick={() => handleDeleteFood(food._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-400 py-6 bg-white/5"
                  >
                    No foods found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMyFoods;
