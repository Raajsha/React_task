import React from 'react';
import styled from 'styled-components';
import { useNavigate} from 'react-router-dom';
import "./landingpage.css";

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
const tosignup = "/signup";
const tosignin ="/signin";

export default function LandingPage() {
  const navigate = useNavigate();
  const reroute1 = () => {
  navigate(tosignup, {replace : true});
  }
  const reroute2 = () => {
    navigate(tosignin, {replace : true});
  }
  return (
    <>
    <h1>
      Welcome to our website's landing page
    </h1>
    <div className='buttons'>
    <Button 
    className = "signupbutton"
    onClick={reroute1}>
      Sign Up
    </Button>
    <Button className='signinbutton' onClick={reroute2}>
      Sign In
    </Button>
    </div>
    </>
  );
};
