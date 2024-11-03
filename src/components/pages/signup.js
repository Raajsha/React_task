import React, {useState} from "react";
import "./signup.css";
import { useTheme } from "../ThemeProvider.js";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppContainer = styled.div`
  padding: 20px;
  margin: auto;
  width: 50%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${({ theme }) => theme.buttonBg};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: darkblue;
  }
`;

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    dob: "",
    phoneNumber: ""
  });

  const {toggleTheme} =  useTheme();
  const [errors, setErrors] = useState({});

  const to_sign_in = "/signin";
  const navigate = useNavigate();

  const signinroute = () => {
    navigate(to_sign_in);
  }
  
  const validate = () => {
    let tempErrors = {};

    if (!/^[A-Za-z\s]{8,20}$/.test(formData.name)) {
      tempErrors.name =
        "Name should be between 8 and 20 alphabetical characters.";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid.";
    }
    if(
      !/^[a-zA-z][a-zA-z0-9-_]{3,23}$/.test(formData.username)
    ) {
      tempErrors.username ="Username is invalid";
    }

    if (
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/.test(
        formData.password
      )
    ) {
      tempErrors.password =
        "Password must be between 8-20 characters, include an uppercase letter, lowercase letter, number, and special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate) {
    alert("Enter all details");
  }
  else{
    try {
      await axios.post('https://auth-backend-138t.onrender.com/api/v1/users/register', JSON.stringify({
        "username": formData.username,
        "fullName": formData.name,
        "email": formData.email,
        "password": formData.password,
        "phone": formData.phoneNumber,
        "dob": formData.dob
      }));
    } catch (error) {
      console.error("Registration failed", error);
    }
  }
  navigate(to_sign_in);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData)
  };

  return (
    <div className="signup">
    <AppContainer className = "form-container">
      <div className="buttons">
      <Button onClick={toggleTheme} className="togglebutton">Toggle Theme</Button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            autoComplete="off" 
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}
        </label>
        <div className="buttons">
        <Button id= "submit" type="submit" onSubmit = {handleSubmit} >Sign Up</Button>
        </div>
      </form>
      <div className="registered">
        Already Registered? <span><a href=" " onClick={signinroute}>Sign In</a></span>
      </div>
    </AppContainer>    
    </div>
    
  );
};

export default SignUp;
