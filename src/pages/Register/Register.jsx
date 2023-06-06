import React from "react";
import "./register.css"



export default function Register() {
    return (
      <>
<div className="register">
    <div className="registerWrapper">
    <div className="registerLeft">
        <h1 className="registerLeftTitle">Social Media App</h1>
        <span className="registerLeftDesc">Connect with your friends and the world around you on Social Media App.</span>
    </div>
    <div className="registerRight">

    <div className="registerForm">
    <input placeholder="Username" className="registerInput" />
    <input placeholder="Email" className="registerInput" />
    <input placeholder="Password" className="registerInput"/>
    <input placeholder="Password Again" className="registerInput"/>
    <button className="registerButton">Log In</button>
    <button className="registerRegistrationButton">Create a New Account</button>


    </div>
    </div>

    </div>
</div>
      </>
    
    );
  }
  
  