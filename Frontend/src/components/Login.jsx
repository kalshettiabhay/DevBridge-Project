import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate= useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
    try {
      const res = await axios.post("/api/auth/login", formData);
      console.log(res.data.user);
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      alert("Welcome")
      navigate(`/${res.data.user.role}`)
    } catch (err) {
      alert("Invalid credentials");
      navigate("/")
    }
    // Call login API here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
         <Link to={"/register"}><button className="text-blue-600 hover:underline">Sign up</button></Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
