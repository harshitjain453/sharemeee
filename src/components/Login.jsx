import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwtDecode from 'jwt-decode'
import {client} from '../client' 



import shareVideo from "../assets/share.mp4";
import frame from "../assets/logowhite.png";

const Login = () => {
  let navigate = useNavigate();
   const createOrGetUser=async (response)=>{
    const decode=jwtDecode(response.credential);
    console.log(decode);
    localStorage.setItem('user',JSON.stringify(decode));
    const {name,picture,sub}=decode;
    
    const user={
        _id:sub,
        _type:'user',
        userName:name,
        image:picture
    }
    client.createIfNotExists(user)
    .then(()=>{
       navigate('/')
    })



   
}

  
  return (
    <div className="flex justify-center items-center flex-column h-screen">
      <div className="relative  h-full w-full">
        <video
          muted
          controls={false}
          autoPlay={true}
          loop
          className="h-full w-full object-cover"
          
                  >
          <source src={shareVideo} type="video/mp4"></source>
        </video>
        <div className="absolute flex flex-column justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay ">
          <div className="p-5 mb-3">
            <img src={frame} width="134px" alt="logo" />
          </div>
          <div className="absolute flex flex-column justify-center items-center top-70 right-0 left-0 bottom-80 rounded " >
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                // console.log(credentialResponse);
                 console.log(createOrGetUser(credentialResponse))
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>

        
        </div>
      
      </div>
    </div> 
  );
};

export default Login;
