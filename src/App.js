import React from 'react';
import SignUp from './components/pages/signup.js';
import LandingPage from './components/pages/landingpage.js';
import Signin from './components/pages/signin.js';
import Mainpage from './components/pages/mainpage.js';
import { Route , Routes} from 'react-router-dom';
import ProtectedRoute from "./components/protectedRoute";
import Layout from "./components/layout.js";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path = "signup" element = {<SignUp />} />
        <Route path = "signin" element = {<Signin />} />
        <Route path = "/" element = {<LandingPage />} />
        {/*<Route path = "mainpage" element = {<ProtectedRoute component={Mainpage}/>} />*/}
        <Route path='mainpage' element = {<Mainpage />} />
      </Route>
    </Routes>
  );
};

export default App;
