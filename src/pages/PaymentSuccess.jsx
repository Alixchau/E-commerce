import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { userRequest } from "../makeRequest";
import { clearCart } from "../redux/cartRedux";
import { setOrder } from "../redux/orderRedux";
import {LoadOrders} from '../redux/apiCalls';


const PaymentSuccess = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const [orderId, setOrderId] = useState(null);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const createOrderAndClearCart = async () => {
      try {
        const response = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            title: item.title,
            img: item.img,
            color: item.color,
            size: item.size,
            price: item.price,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        console.log(response.data);
        setOrderId(response.data._id);
        //clear cart
        dispatch(clearCart());
      } catch { }
      };
      data && createOrderAndClearCart();
    }, [cart, data, currentUser]);

  //api call to update cart
  useEffect( () => {
    LoadOrders(dispatch, currentUser._id);
}, [cart]);



return (
  <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
    {orderId
      ? `Order has been created successfully. Your order number is ${orderId}`
      : `Successfull. Your order is being prepared...`}
    <Link to="/">
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </Link>
  </div>
);
};

export default PaymentSuccess;
