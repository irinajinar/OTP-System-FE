import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import logo from "../images/logo.jpg";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [personalIdentificationNumber, setPersonalIdentificationNumber] =
    useState("");
  const [pin, setPin] = useState("");
  const [passwordGenerated, setPasswordGenerated] = useState(false);

  const navigate = useNavigate();
  const options = {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };

  // useEffect(() => {
  //   if (localStorage.getItem("isLogged") === "true") {
  //     navigate("/");
  //   }
  // }, []);

  const notify = (msg) => toast(msg);

  const handleLogin = async () => {
    localStorage.setItem("isLogged", true);
    navigate("/");
    // axios
    //   .post(
    //     "http://localhost:8080/generate-temporary-pass",
    //     {
    //       email: `${email}`,
    //       personalIdentificationNumber: `${personalIdentificationNumber}`,
    //       pin: `${email}`,
    //       temporaryPassword: `${email}`,
    //     },
    //     options
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     notify("temp error");
    //     localStorage.setItem("isLogged", true);
    //     localStorage.setItem("userId", response.data.id);
    //     navigate("/");
    //   })
    //   .catch((error) =>
    //   {
    //     console.log(error);
    //     notify(error.message);
    //   }
    // );
  };

  const generateTemporaryPassword = async () => {
    notify("temp pass");
    setPasswordGenerated(true);
    // axios
    //   .post(
    //     "http://localhost:8080/generate-temporary-password",
    //     {
    //       email: `${email}`,
    //       personalIdentificationNumber: `${personalIdentificationNumber}`,
    //       pin: `${email}`,
    //     },
    //     options
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     notify(response.data);
    //     setPasswordGenerated(true);
    //   })
    //   .catch((error) =>
    //   {
    //     console.log(error);
    //     notify(error.message);
    //   }
    // );
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src={logo} alt=""></img>
        <h1>Sign in to OTP System</h1>
        <p>otp-system.com</p>
        {!passwordGenerated && (
          <div>
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
              id="loginEmail"
              type={"number"}
              placeholder={"PIN"}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
              }}
            />
            <Button onClick={generateTemporaryPassword}>
              Generate temporary password
            </Button>
          </div>
        )}
        {passwordGenerated && (
          <div>
            <Input
              id="Password"
              type={"Password"}
              placeholder={"Password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button onClick={handleLogin}>Login</Button>
          </div>
        )}
        <div
          style={{
            display: "flex",
            displayDirection: "row",
            justifyContent: "space-between",
            fontSize: "13px",
          }}
        >
          <a href="/register">Don't have an account? Register</a>
        </div>
        <ToastContainer
          autoClose={50000}
          position="bottom-right"
          newestOnTop
          rtl={false}
        />
      </LoginInnerContainer>
    </LoginContainer>
  );
}
export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;

  > img {
    object-fit: contain;
    height: 150px;
    margin-bottom: 20px;
  }

  > div {
    display: flex;
    flex-direction: column;
  }

  > div > button {
    margin-top: 25px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;
