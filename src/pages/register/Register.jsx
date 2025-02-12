import Lottie from "lottie-react";
import RegAnimation from "../../assets/AnimationReg.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [errors, setError] = useState("");

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;
    return hasUppercase && hasLowercase && isLongEnough;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!validatePassword(formData.password)) {
      console.log(formData);
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = { email: formData.email };
      const jwtResponse = await axios.post(
        "https://nazirabazar-server.vercel.app/jwt",
        user
      );

      const token = jwtResponse.data.token;

      if (token) {
        localStorage.setItem("authToken", token); // Save token in localStorage
        toast.success("Registration successful!");
        navigate("/"); // Redirect to home page
      } else {
        toast.error("Failed to retrieve authentication token.");
      }

    } catch (err) {
      console.error(err);
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center px-6">
      <div className="flex items-center gap-24 w-11/12 max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Animation Section */}
        <div className="w-full lg:w-1/2 scale-x-125 scale-y-150 hidden lg:block bg-gradient-to-br from-yellow-500 via-orange-400 to-red-500">
          <Lottie animationData={RegAnimation} loop={true} />
        </div>

        {/* Registration Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            Join the Community
          </h2>

          {errors && <p className="text-red-500 text-center mb-4">{errors}</p>}

          <form className="space-y-2" onSubmit={handleRegister}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-2 w-full px-4 py-3 bg-gray-100 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className="mt-2 w-full px-4 py-3 bg-gray-100 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                required
              />
            </div>

            {/* Photo URL */}
            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-600"
              >
                Photo URL
              </label>
              <input
                type="url"
                id="photoURL"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="mt-2 w-full px-4 py-3 bg-gray-100 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-2 w-full px-4 py-3 bg-gray-100 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Redirect to Login */}
          <p className="mt-6 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-orange-600 hover:underline font-medium"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
