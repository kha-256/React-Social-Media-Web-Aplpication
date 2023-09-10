import { configureStore } from "@reduxjs/toolkit";
import Userslice from "./slices/Userslice";
import PostSlice from "./slices/PostSlice";
import PostUser from "./slices/PostUser";

const store= configureStore({
    reducer:{
        user: Userslice,
        post: PostSlice,
        postuser:PostUser,
    }
})

export default store;