import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const uname = localStorage.getItem("uname");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });
  return <div>{uname}</div>;
};

export default Home;
