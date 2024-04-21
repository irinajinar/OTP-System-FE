import React, { useState } from "react";
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
  const [pin, setPin] = useState("");
  const [personalIdentificationNumber, setPersonalIdentificationNumber] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [passwordGenerated, setPasswordGenerated] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const options = {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };

  const notify = (msg) => toast(msg);

  const handleGeneratePassword = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7085/api/users/generate-temporary-password",
        {
          email: email,
          personalIdentificationNumber: personalIdentificationNumber,
          pin: pin,
        },
        options
      );

      if (response.status === 200) {
        const generatedPassword = response.data;
        notify(`Password: ${generatedPassword}`);
        setTemporaryPassword(generatedPassword);
        setPasswordGenerated(true);
      } else {
        notify("Error generating temporary password. Please try again.");
      }
    } catch (error) {
      console.error(error);
      notify("Error generating temporary password. Please try again.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7085/api/users/login",
        {
          email: email,
          personalIdentificationNumber: personalIdentificationNumber,
          pin: pin,
        },
        options
      );

      if (response.status === 200) {
        setPasswordGenerated(true);
        notify("Login successful.");
        setError("");
      } else {
        notify("Error logging in. Please try again.");
      }
    } catch (error) {
      console.error(error);
      notify("Error logging in. Please try again.");
    }
  };

  const handleRedirectHomePage = async () => {
    navigate("/");
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src={logo} alt=""></img>
        <h1>Sign in to OTP System</h1>
        <p>otp-system.com</p>
        {error && <ErrorText>{error}</ErrorText>}
        {!passwordGenerated && (
          <div>
            <Input
              id="loginEmail"
              type={"email"}
              placeholder={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="personalIdentificationNumber"
              type={"number"}
              placeholder={"Personal Identification Number"}
              value={personalIdentificationNumber}
              onChange={(e) => setPersonalIdentificationNumber(e.target.value)}
            />
            <Input
              id="loginPin"
              type={"password"}
              placeholder={"PIN"}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <Button onClick={handleLogin} style={{ backgroundColor: "#0a8d48", color: "white", marginTop: "10px" }}>
              Validate your personal data
            </Button>
          </div>
        )}
        {passwordGenerated && (
          <>
            <Input
              id="temporaryPassword"
              type={showPassword ? "text" : "password"}
              placeholder={"Please insert the password received"}
              value={temporaryPassword}
              onChange={(e) => setTemporaryPassword(e.target.value)}
            />
            <Button onClick={handleGeneratePassword} style={{ backgroundColor: "#0a8d48", color: "white", marginTop: "10px" }}>
              Generate Password
            </Button>
            <Button onClick={() => setShowPassword(!showPassword)} style={{ backgroundColor: "#0a8d48", color: "white", marginTop: "10px" }}>
              {showPassword ? "Hide Password" : "Show Password"}
            </Button>
            <Button onClick={handleRedirectHomePage} style={{ backgroundColor: "#0a8d48", color: "white", marginTop: "10px" }}>
              Login
            </Button>
          </>
        )}
        <div>
          <p>Don't have an account?</p>
          <TextButton onClick={handleRegisterRedirect} style={{ color: "#0a8d48" }}>
            Register
          </TextButton>
        </div>
        <ToastContainer autoClose={300000} position="bottom-right" newestOnTop rtl={false} />
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
    margin-top: 20px;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const TextButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;
  &:hover {
    color: #0a8d48;
  }
`;
