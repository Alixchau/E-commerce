import axios from "axios";
import { publicRequest,  userRequest } from "../makeRequest";
import { loginFailure, loginStart, loginSuccess,registerSuccess } from "./userRedux";
import {newCart, setCart} from './cartRedux';


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await userRequest.post("/auth/login", user);
    dispatch(loginSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) =>{
  try {
    const response = await userRequest.post("/auth/register", user);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());    
  }
};

export const createCart =  async (dispatch, currentUser) =>{
  try {
    const response = await userRequest.post(`/carts/new/${currentUser._id}`, {    
        userId:currentUser._id      
    });
    console.log(response.data);
    dispatch(newCart(response.data));
  } catch (error) {
    
  }
}; 

export const loadCart = async (dispatch, currentUser) =>{
  try {
    const response = await userRequest.get(`/carts/find/${currentUser._id}`);
    console.log(response.data);
    console.log(currentUser._id);
    //if user doen't have any cart, create a new cart
    if(response.data === null){ 
/*       console.log(currentUser);
      dispatch(newCart(currentUser)); */
      createCart(dispatch, currentUser)
    }else{
      dispatch(setCart(response.data));
    }

  } catch (error) {
    
  }
}
/*  export const updateCart = async (dispatch, cart) =>{
  try {
    const response = await axios.put
  } catch (error) {
    
  }
}   */