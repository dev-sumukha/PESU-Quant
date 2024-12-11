import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show loading toast and store its ID to update it later
    const toastId = toast.loading('Registering user...');
  
    try {
      // Make API request
      const response = await axios.post('http://localhost:3000/api/auth/student/register', formData);
      // Success toast (replaces the loading toast)
      console.log(toastId);
      toast.success('User successfully registered!', { id: toastId });
      console.log('User registered successfully:', response);
      setFormData({
        fullname: "",
        username: "",
        email: "",
        password: "",
      });

      navigate('/login');
      
      
    } catch (error) {
      // Error toast (replaces the loading toast)
      toast.error('Registration failed. Please try again!', { id: toastId });
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-indigo-300">
      <form
        className="bg-white shadow-2xl rounded-lg px-10 py-8 w-full max-w-lg mb-14"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-[#2563EA] mb-8">
          Register
        </h2>

        {/* Full Name Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="John Doe"
            required
            autoComplete="off"
          />
        </div>

        {/* Username Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Username123"
            required
            autoComplete="off"
          />
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="example@email.com"
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
            Register
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:text-blue-700 transition-all duration-300">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;