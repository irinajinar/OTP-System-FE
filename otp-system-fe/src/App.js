import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Login from "./pages/login";
import Register from "./pages/register";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "60px",
    paddingRight: "20px",
  },
});

function App() {
  const isLogged = false;
  const classes = useStyles();

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} exact></Route>
          <Route path="/" element={<Login />} exact></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
