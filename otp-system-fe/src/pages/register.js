import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import styled from "styled-components";
import logo from "../images/logo.jpg";

function Register() {
  const [email, setEmail] = useState("");
  const [personalIdentificationNumber, setPersonalIdentificationNumber] =
    useState("");
  const [pin, setPin] = useState("");

  const options = {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };

  const navigate = useNavigate();

  const registerHandler = (e) => {
    e.preventDefault();
    navigate("/login");
    // axios
    //   .post(
    //     "http://localhost:8081/register",
    //     {
    //       email: `${email}`,
    //       personalIdentificationNumber: `${personalIdentificationNumber}`,
    //       pin: `${email}`,
    //     },
    //     options
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     navigate("/");
    //   })
    //   .catch((error) => console.log(error));
  };

  return (
    <RegisterContainer>
      <RegisterInnerContainer>
        <img src={logo} alt=""></img>
        <h1>Register into OTP System</h1>
        <Input
          id="loginEmail"
          type={"email"}
          placeholder={"Email"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          id="personalIdentificationNumber"
          type={"number"}
          placeholder={"Personal Identification Number"}
          value={personalIdentificationNumber}
          onChange={(e) => {
            setPersonalIdentificationNumber(e.target.value);
          }}
        />
        <Input
          id="pin"
          type={"number"}
          placeholder={"PIN"}
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
          }}
        />
        <Button onClick={registerHandler}>Register</Button>
        <div
          style={{
            display: "flex",
            displayDirection: "row",
            justifyContent: "space-between",
            fontSize: "13px",
          }}
        ></div>
      </RegisterInnerContainer>
    </RegisterContainer>
  );
}
export default Register;

const RegisterContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const RegisterInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 25px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;
