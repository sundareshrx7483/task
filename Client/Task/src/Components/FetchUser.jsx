import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FetchUser = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const navigate = useNavigate();

  const fetchUser = async (query, queryType) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users?${queryType}=${query}`
      );
      if (response.data && response.data.length > 0) {
        setUserDetails(response.data[0]);
        navigate(`/details/${response.data[0].id}`);
      } else {
        setUserDetails(null);
        console.error("No user found.");
      }
    } catch (error) {
      console.error(`Error fetching user by ${queryType}:`, error);
    }
  };

  const handleFetchById = () => {
    if (userId) {
      fetchUser(userId, "id");
    }
  };

  const handleFetchByUsername = () => {
    if (userName) {
      fetchUser(userName, "username");
    }
  };

  const handleFetchByFirstName = () => {
    if (firstName) {
      fetchUser(firstName, "firstname");
    }
  };

  const handleFetchByLastName = () => {
    if (lastName) {
      fetchUser(lastName, "lastname");
    }
  };

  const handleFetchByEmail = () => {
    if (email) {
      fetchUser(email, "email");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="w-full max-w-md mb-4">
        <button
          onClick={handleBack}
          className="w-full p-3 text-sm text-white transition-all duration-200 transform bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105"
        >
          Back to Home
        </button>
      </div>

      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-3 text-sm transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleFetchById}
            className="w-full p-3 text-sm text-white rounded-full bg-gradient-to-r from-green-400 to-teal-500 hover:bg-teal-600"
          >
            Fetch by ID
          </button>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 text-sm transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleFetchByUsername}
            className="w-full p-3 text-sm text-white rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:bg-orange-600"
          >
            Fetch by Username
          </button>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 text-sm transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={handleFetchByFirstName}
            className="w-full p-3 text-sm text-white rounded-full bg-gradient-to-r from-teal-400 to-green-500 hover:bg-teal-600"
          >
            Fetch by First Name
          </button>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 text-sm transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleFetchByLastName}
            className="w-full p-3 text-sm text-white rounded-full bg-gradient-to-r from-purple-400 to-pink-500 hover:bg-pink-600"
          >
            Fetch by Last Name
          </button>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 text-sm transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleFetchByEmail}
            className="w-full p-3 text-sm text-white rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:bg-indigo-600"
          >
            Fetch by Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default FetchUser;
