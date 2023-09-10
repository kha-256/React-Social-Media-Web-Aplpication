import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { json } from "react-router-dom";

let initialState = {
  user: "",
  token: "",
  loading: false,
  error: null
};


//funtion to call user login api
export const userLogin = createAsyncThunk(
  'user/login',
  async (body) => {
    try {
      const response = await axios.post("http://127.0.0.1:8800/api/auth/login", body, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      return response.data;
    } catch (error) {
      // Handle errors if needed
      throw error;
    }
  }
);


//funtion to call user signUp/register api

export const userSignUp = createAsyncThunk(
  'user/signup',
  async (body) => {
    try {
      const response = await axios.post('http://127.0.0.1:8800/api/auth/register', body)
      return response.data
    } catch (error) {
      throw error;
    }
  }
)


const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token")
    },
    addUser: (state, action) => {
      state.user = localStorage.getItem("user")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true;
        state.user = null;
        state.error = null;

      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("API Response:", action.payload); // Add this line to log the entire API response
        const { user, token } = action.payload;
        //console.log("Token received from API:", token); // Add this line to log the token value
        state.error = null;
        state.token = token;
        state.user = user;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        //console.log(action.error.message);
        if (action.error.message === "Request failed with status code 404") {
          state.error = "Access Denied!  Invalid Credentials"
          //console.log(state.error);
        } else if (action.error.message === "Request failed with status code 400") {
          state.error = "Incorrect Password"
         // console.log(state.error);
        }
        else {
          state.error = action.error.message;
        }

      })
      .addCase(userSignUp.pending, (state,action)=>{
        state.loading= true;
        state.user=null;
        state.error=null
      })
      .addCase(userSignUp.fulfilled,(state, action)=>{
        state.loading=false;
        console.log("Signup API Response:", action.payload);
        state.user= action.payload;
        state.error=null
      })
      .addCase(userSignUp.rejected,(state,action)=>{
        state.loading=false;
        state.error = action.error.message;
      })
     
  }

})


export const { addUser, addToken } = UserSlice.actions
export default UserSlice.reducer;