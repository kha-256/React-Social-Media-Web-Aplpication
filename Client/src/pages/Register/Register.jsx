import React from "react";
import "./register.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export default function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setFormData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const navigate = useNavigate();

  const homeNavigation = () => {
    if (formData.userName === "" || formData.email === "" || formData.password === "" || formData.confirmPassword === "") {
      alert("Please fill in the required fields");
    } else if (formData.password !== formData.confirmPassword) {
      alert("The passwords you entered do not match. Please check and re-enter.");
    } else {
      navigate("/home");
    }
  }

  const loginNavigation = () => {

    navigate("/")

  }
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
              <input placeholder="Username" className="registerInput"
                name="userName"
                value={formData.userName}
                onChange={handleInput}
              />
              <input placeholder="Email" className="registerInput"
              type="email"
                name="email"
                value={formData.email}
                onChange={handleInput}
              />
              <input placeholder="Password" className="registerInput"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInput}
              />
              <input placeholder="Confirm Password" className="registerInput"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInput}
              />
              <button className="registerButton" onClick={homeNavigation}>Sign Up</button>
              <button className="registerRegistrationButton" onClick={loginNavigation}>Go Back</button>


            </div>
          </div>

        </div>
      </div>
    </>

  );
}

