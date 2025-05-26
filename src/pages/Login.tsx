import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {FiEye, FiEyeOff} from 'react-icons/fi';
import type { SignupData } from "../types/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // const stored = localStorage.getItem("user");
    // if (!stored) return alert("No user found");

    // const user = JSON.parse(stored);
    // if (user.email === email && atob(user.password) === password) {
    //   Cookies.set("loggedInUser", JSON.stringify(user), { expires: 1 });
    //   navigate("/todo");
    // } else {
    //   alert("Invalid credentials");
    // }
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm space-y-5">
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
    className="text-sm text-indigo-600 hover:underline "
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
  );
};

export default Login;
