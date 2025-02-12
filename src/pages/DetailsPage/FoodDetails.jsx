import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext/AuthContext";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    const fetchFood = () => {
      fetch(`https://nazirabazar-server.vercel.app/foods/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFood(data);
        });
    };
    fetchFood();
  }, [id]);

  const handleRequestFood = async () => {
    if (!food) return;

    const requestDetails = {
      foodId: food._id,
      foodName: food.foodName,
      foodImage: food.foodImage,
      donatorEmail: food.donator.email,
      donatorName: food.donator.name,
      userEmail: user.email,
      requestDate: new Date().toISOString(),
      pickupLocation: food.pickupLocation,
      expireDate: food.expiredDateTime,
      additionalNotes,
    };

    try {
      // Call the backend API to add the food to favorites
      const response = await fetch(
        `https://nazirabazar-server.vercel.app/users/${user.uid}/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ foodId: requestDetails }),
        }
      );

      if (response.ok) {
        toast.success("Food request submitted successfully!");
        navigate("/my-requests");
      } else {
        const errorData = await response.json();
        toast.error("Failed to submit food request.");
      }
    } catch (error) {
      toast.error("Failed to submit food request.");
    }
  };

  if (!food) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-white mb-8">
        Food Details
      </h1>

      <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-xl p-6">
        <img
          src={food.foodImage || "https://via.placeholder.com/300"}
          alt={food.foodName}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <h2 className="text-2xl font-bold text-white mb-4">{food.foodName}</h2>
        <p className="text-gray-300 mb-2">
          <strong>Quantity:</strong> {food.foodQuantity}
        </p>
        <p className="text-gray-300 mb-2">
          <strong>Pickup Location:</strong> {food.pickupLocation}
        </p>
        <p className="text-gray-300 mb-2">
          <strong>Expires On:</strong>{" "}
          {new Date(food.expiredDateTime).toLocaleString()}
        </p>
        <p className="text-gray-300 mb-2">
          <strong>Donator: </strong>
          {food.donator.name} ({food.donator.email})
        </p>

        <p className="text-gray-300 italic mb-4">{food.additionalNotes}</p>
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md shadow-lg hover:from-purple-700 hover:to-indigo-800transition"
        >
          Request Food
        </button>
      </div>

      {/* Dialog Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white/30 backdrop-blur-lg border border-white/30 rounded-xl shadow-xl">
          {/* Modal Close Button */}
          <button
            onClick={() => document.getElementById("my_modal_1").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          {/* Food Information */}
          <div className="w-full h-52 mt-6 overflow-hidden rounded-md">
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-start justify-between">
              <p className="text-xl font-medium text-white">{food.foodName}</p>
              <p className="text-sm text-gray-800 pb-4">{food._id}</p>
            </div>

            <p className="text-gray-800">
              Donator:{" "}
              <span className="text-white">
                {food.donator.name} ({food.donator.email})
              </span>
            </p>
            <p className="text-gray-800">
              Pickup Location:{" "}
              <span className="text-white">{food.pickupLocation}</span>
            </p>
            <p className="text-gray-800">
              Expires On:{" "}
              <span className="text-white">
                {new Date(food.expiredDateTime).toLocaleString()}
              </span>
            </p>
            <p className="text-gray-800">
              Your Email: <span className="text-white">{user.email}</span>
            </p>
            <p className="text-gray-800">
              Request Date:{" "}
              <span className="text-white">{new Date().toLocaleString()}</span>
            </p>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-white pt-4">
              Additional Notes
            </label>
            <input
              type="text"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Add any notes for the donator..."
              className="input input-bordered w-full text-black bg-white/10 rounded-md"
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="bg-gradient-to-r from-teal-500 to-green-600 px-6 py-2 rounded-lg text-white font-bold"
                onClick={handleRequestFood}
              >
                Request Food
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FoodDetails;
