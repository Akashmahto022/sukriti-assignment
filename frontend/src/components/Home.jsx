import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const url = "http://localhost:4000"
  const [user, setUser] = useState([])

  const getAllUsers = async()=>{
    try {
      const response = await axios.get(`${url}/api/allusers`)
      setUser(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error.message)
    }

  }

  useEffect(()=>{
    getAllUsers()
  },[])

  return (
    <div className="mt-4 ">
      <div className="flex flex-wrap justify-center items-center gap-2">
        <Link to={"/register"}>
          <button className="mx-2 w-24 bg-blue-700 rounded-md p-2 text-white font-bold">
            Register
          </button>
        </Link>
        <Link to={"/login"}>
          <button className="mx-2 w-24 bg-blue-700 rounded-md p-2 text-white font-bold">
            Login
          </button>
        </Link>
      </div>
      <h1 className="flex flex-wrap justify-center mt-6 font-bold">All Register Users</h1>
    <div className="grid grid-cols-3 gap-2 m-4 md:grid-cols-2">
      {user.map((user)=>(
        <div key={user._id} className="bg-slate-300 rounded-xl p-4" >
          <div className="flex flex-wrap gap-2">
          <button className="w-24 py-1 bg-blue-700 rounded-lg font-bold text-white">Read</button>
          <button className="w-24 py-1 bg-blue-700 rounded-lg font-bold text-white">Update</button>
          <button className="w-24 py-1 bg-blue-700 rounded-lg font-bold text-white">Delete</button>
          </div>
          <div className="">
            <h1 className="font-medium">User ID: <span className="text-orange-500 font-semibold hover:text-white">{user._id}</span></h1>
            <h1 className="font-medium">User Name: <span className="text-orange-500 font-semibold hover:text-white">{user.username}</span></h1>
            <h1 className="font-medium">User Email: <span className="text-orange-500 font-semibold hover:text-white">{user.email}</span></h1>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Home;