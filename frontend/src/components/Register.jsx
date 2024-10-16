import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const url = "http://localhost:4000";
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/register`, {
        username,
        email,
        password
      })
      navigate("/login");
    } catch (error) {
      console.log(error.message)
    }

  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Register
        </h2>
        <h2 className="mb-6 text-center text-gray-700">
          if you allready register go to login by{" "}
          <Link to={"/login"} className="underline">
            {" "}
            login here
          </Link>
        </h2>
        <form onSubmit={handleSubmit}>
          {/* username */}
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="name"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="Enter your Username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
