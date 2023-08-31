import React from "react";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import { Routes,Route } from 'react-router-dom';

function App() {

  return (
<Routes>
  <Route  path="/" element={<Login/>} />
  <Route  path="/register" element={<Register/>} />
  <Route  path="/home" element={<Home/>} />
  <Route  path="/profile" element={<Profile/>} />



</Routes>

  );
}

export default App;
