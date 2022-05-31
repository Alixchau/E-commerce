import { publicRequest, userRequest } from "../makeRequest";
import { loginFailure, loginStart, loginSuccess, registerSuccess } from "./userRedux";
import { newCart, setCart } from './cartRedux';
import { setOrder } from './orderRedux';


export const Registerfunc = async (dispatch, user) => {
  try {
    const response = await userRequest.post("/auth/register", user);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const CreateCart = async (dispatch, userId) => {
  try {

    
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
console.log(TOKEN);

    const response = await userRequest.post(`/carts/new/${userId}`, {
      userId: userId
    });
    console.log(response.data);
    dispatch(newCart(response.data));
  } catch (error) {}
};

export const LoadCart = async (dispatch, userId) => {
  try {
    const response = await userRequest.get(`/carts/find/${userId}`);

    console.log(response.data);
    console.log(userId);
    //if user doen't have any cart, create a new cart
    if (response.data === null) {
      CreateCart(dispatch, userId);
      console.log(userId);
    } else {
     console.log(response.data.userId);
      dispatch(setCart(response.data));
    }
  } catch (error) {}
};
export const UpdateCart = async (cart) => {
  try {
    const response = await userRequest.put(`/carts/${cart._id}`, {
      body: cart
    });
    console.log(response.data);
  } catch (error) {}
};

export const  LoadOrders = async (dispatch, userId) =>{
  try{
    const orderListResponse =await userRequest.get(`/orders/find/${userId}`);
    console.log(orderListResponse.data);
    dispatch(setOrder(orderListResponse.data));
  } catch { }
};


export const Loginfunc = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await userRequest.post("/auth/login", user);
    console.log(response.data);
    dispatch(loginSuccess(response.data));
    LoadCart(dispatch, response.data._id);
    LoadOrders(dispatch, response.data._id);
    console.log(response.data);
  } catch (error) {
    dispatch(loginFailure());
  }
};
