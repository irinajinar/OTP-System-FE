import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";


function App() { 

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} exact></Route>
          <Route path="/login" element={<Login />} exact></Route>
          <Route path="/" element={<Home />} exact></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
