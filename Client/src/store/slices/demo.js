import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { json } from "react-router-dom";

let initialState={
    user:"",
    token:"",
    loading: false,
    error:null
};

export const userLogin = createAsyncThunk(
    "user/login/",
    async (body) => {
      try {
        const response = await axios.post('http://127.0.0.1:8800/api/auth/login', body, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        return response.data;
      } catch (error) {
        // Handle errors by returning an error object
        return {
          error: error.response.data.error || "An error occurred during login"
        };
      }
    }
  );
  

//userslice

const UserSlice= createSlice({
    name: 'user',
    initialState,
    reducers:{
        addToken:(state,action)=>{
            state.token=localStorage.getItem("token")
        },
        addUser:(state,action)=>{
            state.user=localStorage.getItem("user")
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(userLogin.pending, (state,action)=>{
            state.loading=true;
            state.user=null;
            state.error=null;
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            state.loading=false;
            console.log('API Response', action.payload);
            const {user, token}= action.payload;
            console.log('Token Received: ', token);
            state.error=null;
            state.user=user;
            state.token=token;
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user', JSON.stringify(user))
        })
         .addCase(userLogin.rejected, (state, action) => {
    state.loading = false;

    if (action.error.message === "Request failed with status code 401") {
        state.error = "Access Denied! Invalid Credentials";
    } else if (action.error.response && action.error.response.data && action.error.response.data.error) {
        // Check if there's an error message in the response data
        state.error = action.error.response.data.error;
    } else {
        state.error = action.error.message;
    }
})

    }
})

export const {addToken,addUser}= UserSlice.actions
export default UserSlice.reducer