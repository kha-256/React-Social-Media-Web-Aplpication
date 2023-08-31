import React from "react";
import "./Login.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export default function Login() {

  const [formData, setFormData]= useState({
    email:"",
    password:""
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInput=(event)=>{
    const name=event.target.name;
    const value= event.target.value
    setFormData((prev)=>{
      return {...prev,[name]: value}
    })
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate= useNavigate();

  const homeNavigation=()=>{
    if (formData.email === "" || formData.password === "" ) {
      alert("Please fill in the required fields");
    }
    else{
      navigate("/home")
    }
  }


  const registerNavigation=()=>{
    
      navigate("/register")
  }

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
    <input placeholder="Email" className="loginInput" 
      name="email"
      value={formData.email}
      onChange={handleInput}
    />
    <input placeholder="Password" className="loginInput" 
      type={passwordVisible ? 'text' : 'password'} // Set the input type conditionally
    name="password"
    value={formData.password}
    onChange={handleInput}
    />
 <span onClick={togglePasswordVisibility} className="password-toggle">
        {passwordVisible ? 'Show Password' : 'Show Password'}
      </span>
    <button className="loginButton" onClick={homeNavigation}>Log In</button>
    <span className="loginForget">Forget Password?</span>
    <button className="loginRegistrationButton" onClick={registerNavigation}>Create a New Account</button>


    </div>
    </div>

    </div>
</div>
      </>
    
    );
  }
  
  