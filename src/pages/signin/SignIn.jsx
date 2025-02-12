import { useState } from "react";
import Lottie from "lottie-react";
import LoginAnimation from "../../assets/AnimationLogin.json";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    console.log("Validating Inputs");

    if (!email.includes("@")) {
      console.log("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      console.log("Password must be at least 6 characters long.");
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    console.log("Validated Inputs");
    return true;
  };

  // ------------------------------------------------ Passwork Authentication

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const user = { email };
      const jwtResponse = await axios.post(
        "https://nazirabazar-server.vercel.app/jwt",
        user
      );

      const token = jwtResponse.data.token;

      if (token) {
        localStorage.setItem("authToken", token); // Save token in localStorage
        toast.success("Login successful!");
        navigate("/"); // Redirect to home page
      } else {
        toast.error("Failed to retrieve authentication token.");
      }
    } catch (err) {
      console.error("Error logging in:", err.message);
      toast.error("Couldn't log in.");
    }
  };

  // -----------------------------------------------------------------  Handle Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);

      const user = { email };
      const response = await axios.post(
        "https://nazirabazar-server.vercel.app/jwt",
        user
      );

      const token = response.data.token;

      if (token) {
        localStorage.setItem("authToken", token);
        toast.success("logged in with Google");
        navigate("/");
      } else {
        toast.error("Failed to retrieve authentication token.");
      }

    } catch (err) {
      console.error("Error with Google login:", err.message);
      toast.error("Failed to log in with Google. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center w-11/12 max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Animation Section */}
        <div className="w-1/2 h-full hidden md:block bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400">
          <Lottie animationData={LoginAnimation} loop={true} />
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            Welcome Back!
          </h2>

          <form className="space-y-6" onSubmit={handleSignIn}>
            {/* Email Field */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="w-full px-4 py-3 bg-gray-100 border rounded-lg text-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-100 border rounded-lg text-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                disabled={loading}
              />
            </div>

            {/* Sign-In Button */}
            <button
              type="submit"
              className={`w-full py-3 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className={`w-full mt-4 flex items-center justify-center gap-2 text-black font-semibold py-3 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            <img
              src="https://img.icons8.com/color/20/google-logo.png"
              alt="Google Logo"
            />
            {loading ? "Signing In..." : "Sign in with Google"}
          </button>

          {/* Redirect to Register */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don&#39;t have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-600 hover:underline font-semibold"
            >
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
