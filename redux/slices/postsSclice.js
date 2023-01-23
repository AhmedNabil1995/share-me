import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getposts = createAsyncThunk('/getposts',(cat)=>{
    if(cat) return  axios.get(`http://localhost:5000/posts?category=${cat}&_expand=user&_sort=id&_order=desc&_embed=saved`);
    return axios.get(`http://localhost:5000/posts?_expand=user&_sort=id&_order=desc&_embed=saved`);
})

export const searchPosts = createAsyncThunk('/searchposts',(q)=>{
    return axios.get(`http://localhost:5000/posts?_expand=user&q=${q}&_sort=id&_order=desc&_embed=saved`);
})

const initialState = {
    posts:[]
}

const postsSlice = createSlice({
    name:'posts',
    initialState,
    extraReducers:{
        [getposts.fulfilled]:(state,action)=>{
            state.posts = action.payload.data || []
        },
        [searchPosts.fulfilled]:(state,action)=>{
            state.posts = action.payload.data
        }
    }
})

export default postsSlice.reducer
