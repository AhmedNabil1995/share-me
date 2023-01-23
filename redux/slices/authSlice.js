import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null
}

const authSlice = createSlice({
    name:'auth',
        initialState,
        reducers:{
            logIn:(state,action)=>{
                state.currentUser = action.payload;
            },
            logOut:()=>{
                state = initialState;
            }
        }
})

export default authSlice.reducer;
export const {logIn,logOut} = authSlice.actions;