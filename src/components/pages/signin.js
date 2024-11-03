import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import { useTheme } from "../ThemeProvider";
import {useNavigate} from 'react-router-dom';
import AuthContext  from '../authContext';
import login from "../authContext";
import "./signin.css";

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
const AppContainer = styled.div`
  padding: 20px;
  margin: auto;
  width: 50%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border-radius: 10px;
`;

export default function Signin() {

  const navigate = useNavigate();
  const to_main_page = "/mainpage";
  const to_sign_up = "/signup";
  const {toggleTheme} =  useTheme();
  const [errors, setErrors] = useState();
  const [formData, setFormData] =useState({username: '', password: ''})

  const main_page_route = () => {
    navigate(to_main_page);
    };

  const sign_up_route = () => {
    navigate(to_sign_up);
  }  
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setErrors(' ');

    try {
      await login(formData.username, formData.password);
      navigate(to_main_page);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.message || "Login failed. Please check your credentials.");
      } else {
        setErrors("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData)
  };

  return (
    <div className='signin'>
    <AppContainer className='form-container'>
        <div className="buttons">
          <Button onClick={toggleTheme} className="togglebutton">Toggle Theme</Button>
        </div>
        <p className = {errors? "error" : "offscreen"} aria-live = 'assertive'>
          {errors}
        </p>
        <form onSubmit={HandleSubmit}>
          <label htmlFor='username'>
              Username:
              <input
                type="text"
                id="username"
                name='username'
                autoComplete='off'
                value = {formData.username}
                required
                onChange={handleChange}
              />
            </label>
            <label htmlFor='password'>
              Password:
              <input
                type="password"
                id="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <div className="buttons">
            <Button type="submit" onSubmit={HandleSubmit}>Sign In</Button>
          </div>
        </form>
        <p> Don't have an account? <span className='line' ><a href=' ' onClick={sign_up_route}>Sign Up</a></span></p>
    </AppContainer>
    </div>
  );
};
