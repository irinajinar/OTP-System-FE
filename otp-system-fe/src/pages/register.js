import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import styled from "styled-components";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const options = {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };

  const navigate = useNavigate();

  const registerHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8081/register",
        {
          firstName: `${firstName}`,
          lastName: `${lastName}`,
          telephoneNumber: `${telephoneNumber}`,
          address: `${address}`,
          email: `${email}`,
          password: `${password}`,
        },
        options
      )
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <RegisterContainer>
      <RegisterInnerContainer>
        {/* <img src={logo} alt=""></img> */}
        <h1>Register into CakeShop</h1>
        <Input
          id="registerFirstName"
          type={"firstName"}
          placeholder={"FirstName"}
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <Input
          id="registerLastName"
          type={"lastName"}
          placeholder={"LastName"}
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <Input
          id="registertelephoneNumber"
          type={"telephoneNumber"}
          placeholder={"TelephoneNumber"}
          value={telephoneNumber}
          onChange={(e) => {
            setTelephoneNumber(e.target.value);
          }}
        />
        <Input
          id="registeraddress"
          type={"address"}
          placeholder={"Address"}
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
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
          id="loginPassword"
          type={"Password"}
          placeholder={"Password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
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
