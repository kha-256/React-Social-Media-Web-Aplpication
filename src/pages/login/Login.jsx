import React from "react";
import "./Login.css"



export default function Login() {
    return (
      <>
<div className="login">
    <div className="loginWrapper">
    <div className="loginLeft">
        <h1 className="loginLeftTitle">Reactsocial</h1>
        <span className="loginLeftDesc">Connect with your friends and the world around you on Reactsocial</span>
    </div>
    <div className="loginRight">

    <div className="loginForm">
    <input placeholder="Email" className="loginInput" />
    <input placeholder="Password" className="loginInput"/>
    <button className="loginButton">Sign Up</button>
    <span className="loginForget">Forget Password?</span>
    <button className="loginRegistrationButton">LoginIn</button>


    </div>
    </div>

    </div>
</div>
      </>
    
    );
  }
  
  