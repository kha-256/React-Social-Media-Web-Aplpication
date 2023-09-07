import React from "react";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import { Routes,Route ,} from 'react-router-dom';
import { Provider } from "react";
import { Navigate } from "react-router-dom";



function App() {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  return (
<Routes>
  <Route  path="/" element={user && token ? <Navigate to="/home" /> : <Login />}  />
  <Route  path="/register" element={<Register/>} />
  {user && token && <Route path="/home" element={<Home />} />}
  {user && token && <Route path="/profile" element={<Profile />} />}



</Routes>

  );
}

export default App;
