import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLogged") != "true") {
      navigate("/login");
    }
  }, []);

  return <div>Congrats</div>;
}
export default Home;
