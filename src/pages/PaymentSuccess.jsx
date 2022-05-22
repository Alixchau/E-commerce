import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";


const PaymentSuccess = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/orders", {
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        console.log(response.data._id);
        setOrderId(response.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data]);

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