import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:"user",
  initialState:{
    currentUser:null,
    isFetching:false, 
    loginError: false ,
    registerError:false,
    registered: false
  },
  reducers:{
    loginStart: (state) =>{
      state.isFetching = true;
    },
    loginSuccess: (state, action) =>{
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) =>{
      state.isFetching = false;
      state.error = true;
    },
    logout:(state) =>{
      state.currentUser = null;
      state.registered = false; //manipulate dom in register page
      state.loginError = false;
      state.registerError = false;
    },
    registerSuccess:(state)=>{
      state.registered = true;
    },
    registerToHome:(state,action) =>{
      state.currentUser = action.payload;
    }
  },
});

export const {loginStart, loginSuccess, loginFailure, logout, registerSuccess, registerToHome} = userSlice.actions;
export default userSlice.reducer;