import React,{useEffect}from "react";
import {Routes,Route,useNavigate} from 'react-router-dom';
import Login from "./components/Login";
import Home from "./container/Home";
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
   const navigate=useNavigate();

  useEffect(() => {
   const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

   if (!User) navigate('/login');
 }, []);
   
  return (
     <GoogleOAuthProvider clientId="1046738154036-a9hhaall0et333pbdp71tvmuep2sfte8.apps.googleusercontent.com">
     <Routes>
        <Route  path='/Login' element={<Login/>}/>
        <Route  path='/*' element={<Home />}/>
     </Routes>
     </GoogleOAuthProvider>
  );
};

export default App;
