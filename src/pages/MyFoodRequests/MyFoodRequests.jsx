import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const MyFoodRequests = () => {
  const currentUser = useContext(AuthContext);
  const [requestedFoods, setRequestedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestedFoods = async () => {
        const token = localStorage.getItem("authToken");
    
        if (!token) {
            toast.error("No authentication token found!");
            return;
        }
    
        try {
            const response = await axios.get(
                `https://nazirabazar-server.vercel.app/users/${currentUser.user.uid}/favorites`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the header
                    },
                }
            );
            setRequestedFoods(response.data);
        } catch (error) {
            console.error("Error fetching requested foods:", error);
            toast.error("Failed to fetch requested foods.");
        } finally {
            setLoading(false);
        }
    };
    
  
    if (currentUser.user?.uid) {
      fetchRequestedFoods();
    }
  }, [currentUser.user?.uid]);
  

  return (
    <div className="min-h-screen bg-base-100 px-6 py-12 flex flex-col items-center">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8 w-full max-w-6xl">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          My Food Requests
        </h1>

        {loading ? (
          <p className="text-center text-gray-300 text-lg">Loading...</p>
        ) : requestedFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {requestedFoods.map((food) => (
              <div
                key={food._id}
                className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-white">
                  <h2 className="text-xl font-bold truncate">{food.foodName}</h2>
                  <p className="text-gray-300 text-sm mt-1">
                    Donor: <span className="text-gray-100">{food.donator.name}</span>
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    Pickup Location:{" "}
                    <span className="text-gray-100">{food.pickupLocation}</span>
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    Expiry Date:{" "}
                    <span className="text-gray-100">
                      {new Date(food.expiredDateTime).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300 text-lg">
            No food requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyFoodRequests;
