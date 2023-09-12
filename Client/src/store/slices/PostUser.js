import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { json } from "react-router-dom";

let initialState = {
  postUser: "",
  loading: false,
  error: null
};


//funtion to get user

export const getUser = createAsyncThunk(
  'user/get',
  async (userId) => {
    try {
     // console.log(`Fetching user with ID ${userId}`);
      const response = await axios.get(`http://127.0.0.1:8800/api/users/${userId}`)
      //console.log("API Response:", response.data); // Log the API response
      return response.data
    } catch (error) {
      console.error("Error fetching user:", error); // Log the error
      throw error;
    }
  }
)
const PostUser = createSlice({
  name: 'postUser',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
        state.postUser = null;
        state.error = null;

      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("API Response:", action.payload); // Add this line to log the entire API response
        state.error = null;
        state.postUser = action.payload;
      
      })
      .addCase(getUser.rejected,(state,action)=>{
        state.loading=false;
        state.error = action.error.message;
      })
  }

})



export default PostUser.reducer;