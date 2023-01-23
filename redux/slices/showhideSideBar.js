import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hideshow:false
}

const showHideSideBar = createSlice({
    name:'showhideSideBar',
        initialState,
        reducers:{
            show:(state)=>{
                state.hideshow = true ;
                console.log(state.hideshow);
            },
            hide:(state)=>{
                state.hideshow = false ;
            },
            toggle:(state)=>{
                state.hideshow = !state.hideshow;
            }
        }
})

export default showHideSideBar.reducer;
export const {show,hide,toggle} = showHideSideBar.actions;