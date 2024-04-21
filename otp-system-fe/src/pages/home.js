import React from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import logo from "../images/logo.jpg";

function Home() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("isLogged"); 
    navigate("/login"); 
  };

  return (
    <HomeContainer>
      <img src={logo} alt="Logo"></img>
      <div>Congratulations! You are logged in.</div>
      <Button onClick={signOut}>Sign out</Button>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  text-align: center;
  justify-content: center;
  background-color: white;
  display: content;
  flex-direction: column;
  margin: 200px;

  > img {
    object-fit: contain;
    height: 150px;
    margin-bottom: 20px;
  }

  > button {
    display: content;
    margin-top: 25px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;
