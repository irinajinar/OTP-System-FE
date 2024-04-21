import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import styled from "styled-components";
import logo from "../images/logo.jpg";

function Register() {
  const [email, setEmail] = useState("");
  const [personalIdentificationNumber, setPersonalIdentificationNumber] = useState("");
  const [pin, setPin] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pinError, setPinError] = useState("");  
  const [personalIdentificationNumberError, setPersonalIdentificationNumberError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const options = {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };

    const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isValidPersonalIdentificationNumber = (personalIdentificationNumber) => {    
    const pinRegex = /^\d+$/;    
    return pinRegex.test(personalIdentificationNumber) && personalIdentificationNumber.length >= 1 && personalIdentificationNumber.length <= 13;
  };

  
  const isValidPin = (pin) => {    
    const pinRegex = /^\d+$/;    
    return pinRegex.test(pin) && pin.length >= 4;
  };


  const validateEmail = () => {
    if (!email) {
      setEmailError("Please enter your email address.");
      return false;
    } else if (!isValidEmail(email)) {
      setEmailError("Your email address is not valid.");
      return false;
    }
    return true;
  };

  const validatePersonalIdentificationNumber = () => {    
    if (!personalIdentificationNumber) {
      setPersonalIdentificationNumberError("Please enter your personal identification number. Personal identification number must be between 1 and 13 characters.");
      return false;
    } else if (!isValidPersonalIdentificationNumber(personalIdentificationNumber)) {
      setPersonalIdentificationNumberError("Your personal identification number is not valid.");
      return false;
    }
    return true;
  };

  const validatePin = () => {
    if (!pin) {
      setPinError("Please enter your PIN.");
      return false;
    } else if (!isValidPin(pin)) {
      setPinError("Your PIN is not valid. It must be at least 4 digits.");
      return false;
    }
    return true;
  };

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
    setTimeout(() => {
      navigate("/login");
    }, 60000); 
  };

  const registerHandler = (e) => {
    e.preventDefault();
    if (!validateEmail() || !validatePersonalIdentificationNumber() || !validatePin()) {
      return;
    }
    axios
     .post(
      "https://localhost:7085/api/users/register",
     {
         email: `${email}`,
          personalIdentificationNumber: `${personalIdentificationNumber}`,
          pin: pin,
         },
         options
      )
      .then((response) => {
        console.log(response.data);
        if (response.data === "EmailExists") {
          setErrorMessage("This email address is associated with another user.");
        } else if (response.data === "PersonalIdentificationNumberExists") {
          setErrorMessage("This personal identification number is already associated with another user.");
        } else {
          handleRegistrationSuccess();
        }
      })
       .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrorMessage("An error occurred during registration. Please try again later.");
        } else {
          setErrorMessage("An unexpected error occurred during registration. Please try again later.");
        }
        console.log(error);
      });
  };

  return (
    <RegisterContainer>
      <RegisterInnerContainer>
        <img src={logo} alt="Logo"></img>
        <h1>Register into OTP System</h1>
        {registrationSuccess ? (
          <SuccessMessage>
            Your registration is done with success! You will be redirected to the login page in 1 minute, or click the button below to go manually.
            <ButtonWrapper>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </ButtonWrapper>
          </SuccessMessage>
        ) : (
          <>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <Input
              id="loginEmail"
              type={"email"}
              placeholder={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <ErrorText>{emailError}</ErrorText>}
            <Input
              id="personalIdentificationNumber"
              type={"number"}
              placeholder={"Personal Identification Number"}
              value={personalIdentificationNumber}
              onChange={(e) => setPersonalIdentificationNumber(e.target.value)}
            />
            {personalIdentificationNumberError && <ErrorText>{personalIdentificationNumberError}</ErrorText>}
            <Input
              id="pin"
              type={"number"}
              placeholder={"PIN"}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            {pinError && <ErrorText>{pinError}</ErrorText>}
            <Button onClick={registerHandler}>Register</Button>
            <div>
              <p style={{ color: "green" }}>Already have an account?</p>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </div>
          </>
        )}
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

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;