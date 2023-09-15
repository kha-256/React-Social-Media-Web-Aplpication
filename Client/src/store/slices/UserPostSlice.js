import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { json } from "react-router-dom";

let initialState = {
    posts: [],
    loading: false,
    error: null,
}

//funtion to call get post api

export const getTimelinePost = createAsyncThunk(
    'userPost',
    async (userId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8800/api/posts/timeline/${userId}`)
            return response.data;
        } catch (error) {
            // Handle errors if needed
            throw error;
        }
    }
)


const UserPostSlice= createSlice({
    name: 'UserPost',
    initialState,
    reducers:{
    
    }, 
    extraReducers:(builder)=>{
        builder
        .addCase(getTimelinePost.pending,(state,action)=>{
            state.loading=true;
            state.posts=null;
            state.error=null
        })
        .addCase(getTimelinePost.fulfilled,(state,action)=>{
            state.loading=false;
            state.posts=action.payload;
            state.error=null;
        })
        .addCase(getTimelinePost.rejected,(state,action)=>{
            state.loading=false;
            state.posts=null;
            state.error=action.error.message
        })
    }
}) 

export default UserPostSlice.reducer;