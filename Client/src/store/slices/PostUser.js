import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  postUser: {}, // Change to an array
  loading: false,
  error: null
};

export const getUser = createAsyncThunk(
  'user/get',
  async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8800/api/users?userId=${userId}`)
      //console.log("API Response:", response.data);
      const userData=response.data;
      return userData;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }
);

const PostUser = createSlice({
  name: 'postUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { _id, ...userData } = action.payload; // Assuming there's an 'id' in userData
        state.postUser[_id] = userData;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default PostUser.reducer;
