import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import postsSclice from "./slices/postsSclice";
import showhideSideBar from "./slices/showhideSideBar";

export let store = configureStore({
    reducer:{
        posts:postsSclice,
        auth:authSlice,
        showhidesidebar:showhideSideBar
    }
})