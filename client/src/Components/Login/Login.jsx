import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState(null);
  const [status, setStatus] = useState(null); // Default null for no initial status
  const navigate = useNavigate();

  const onChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/userlogin",
        loginData
      );
      const { sts, msg, token, uname, uemail } = response.data;

      setStatus(sts);
      setMsg(msg);

      if (sts === 0) {
        localStorage.setItem("token", token);
        localStorage.setItem("uname", uname);
        localStorage.setItem("uemail", uemail);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setMsg("An error occurred. Please try again.");
      setStatus(3); // 3 for generic error
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="email"
          onChange={onChange}
          name="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="password"
          onChange={onChange}
          name="password"
          required
        />
        {msg && (
          <div className={status === 0 ? "green" : "red"}>{msg}</div>
        )}
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;
