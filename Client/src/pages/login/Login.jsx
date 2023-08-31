import React from "react";
import "./Login.css"
import { LineStyle } from "@mui/icons-material";





export default function Login() {
    return (
      <>
<div className="login">
    <div className="loginWrapper">
    <div className="loginLeft">
        <h1 className="loginLeftTitle">Social Media App</h1>
        <span className="loginLeftDesc">Connect with your friends and the world around you on Social Media App.</span>
    </div>
    <div className="loginRight">

    <div className="loginForm">
    <input placeholder="Email" className="loginInput" />
    <input placeholder="Password" className="loginInput"/>
    <button className="loginButton">Log In</button>
    <span className="loginForget">Forget Password?</span>
    <button className="loginRegistrationButton">Create a New Account</button>


    </div>
    </div>

    </div>
</div>
      </>
    
    );
  }
  
  