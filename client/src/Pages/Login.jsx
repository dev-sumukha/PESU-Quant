import axios from "axios";
import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userContext from "../store/UserContext"; // Make sure the context is properly exported from its file

const Login = () => {
  const [formData, setFormData] = useState({
    email: "", // Will accept both username or email
    password: "",
  });
  
  const navigate = useNavigate(); 
  const { storeTokenInLS } = useContext(userContext); // Ensure that storeTokenInLS is available in userContext

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/user/login', formData);

      // Check if the request was successful
      if (res.status === 200 && res.data.token) {
        // Store the token in local storage (or context)
        storeTokenInLS(res.data.token);
        // Navigate to profile page
        navigate('/profile');
        toast.success('Login successful!');
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error.message); // Log the actual error for debugging
      toast.error('An error occurred during login. Please try again.'); // User-friendly error message
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-indigo-300">
      <form
        className="bg-white shadow-2xl rounded-lg px-10 py-8 w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-[#2563EA] mb-8">
          Login to Your Account
        </h2>

        {/* Username or Email Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Username or Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter your username or email"
            required
            autoComplete="off"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-[#2563EA] text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 ease-in-out"
          >
            Login
          </button>
        </div>

        {/* Register Link */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:text-blue-700 transition-all duration-300">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
