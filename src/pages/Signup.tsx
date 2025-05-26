import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schema/authSchema";
import type { SignupData } from "../types/types";
import { useNavigate } from "react-router-dom";
import {FiEye, FiEyeOff} from 'react-icons/fi';
import { useState } from "react";



const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupData) => {
      const hashedData = {
    ...data,
    password: btoa(data.password), // encode password
    confirmPassword: btoa(data.confirmPassword), // also encode confirmPassword
  };


const storedUsers = localStorage.getItem("users");
const users = storedUsers ? JSON.parse(storedUsers) : [];

const existing = users.find((u: SignupData) => u.email === data.email);
if (existing) {
  alert("User already exists!");
  return;
}

users.push(hashedData);
localStorage.setItem("users", JSON.stringify(users));
    navigate("/");
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600">Sign Up</h2>

        <div>
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <input
  type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <div>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 cursor-pointer"
        >
          Register
        </button>
        <button
  type="button"
  onClick={() => navigate("/")}
  className="w-full bg-gray-200 text-indigo-600 font-semibold py-3 rounded-lg hover:bg-gray-300 transition duration-300 cursor-pointer"
>
  Back to Login
</button>
      </form>
    </div>
  );
};

export default Signup;
