import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import type { SignupData } from "../types/types";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const loggedInUser = Cookies.get("loggedInUser");
    if (loggedInUser) {
      navigate("/todo");
    }
  }, []);

  const handleLogin = () => {
    const stored = localStorage.getItem("users");
    if (!stored) return alert("No user found");

    const users = JSON.parse(stored);
    const user = users.find(
      (u: SignupData) => u.email === email && atob(u.password) === password
    );

    if (user) {
      Cookies.set("loggedInUser", JSON.stringify(user), { expires: 1 });
      navigate("/todo");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex justify-center items-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm space-y-5">
          {/* Logo at the top */}
          <img
            src="/ats.png"
            alt="Aaja Ta Suree Logo"
            className="w-24 mx-auto mb-4"
          />

          <h2 className="text-2xl font-bold text-center text-indigo-600">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="text-center mt-4">
            <a
              href="#"
              className="text-sm text-indigo-600 hover:underline"
              onClick={() => alert("Forgot password functionality coming soon!")}
            >
              Forgot Password?
            </a>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 cursor-pointer"
          >
            Log In
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
