import React, { useState } from "react";
import axios from "axios";
import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/adduser",
        userData
      );
      console.log(res);
      navigate("/login");
    } catch (error) {
      // Check if the error response indicates an existing user
      if (error.response && error.response.data.sts === 1) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage("An unexpected error occurred!!. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Register</button>
        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
  );
};

export default Registration;
