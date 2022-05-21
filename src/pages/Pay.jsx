import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';
import axios from 'axios';

const my_PUBLISHABLE_stripekey = "pk_test_51L1ck6D2bTqVrtoS5iNwhb3MsPmh7VJHN5TBvMbrD6tFjKHBZa7MsmT3fONAkL7vt8tRqcQMAGOs8smVastBym1R00DYOCJf4V";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);

  //generate stripeToken
  const onToken = (token) => {
    setStripeToken(token);
  };

//when there's stripeToken, make backend request
   useEffect(() => {
    const makeBackendRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 2000,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    stripeToken && makeBackendRequest();
  }, [stripeToken]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <StripeCheckout
        name='LOLA Shop'
        billingAddress
        shippingAddress
        description='Your total is $20'
        amount={2000}
        token={onToken}
        stripeKey={my_PUBLISHABLE_stripekey}
      >
        <button
          style={{
            border: "none",
            width: "120px",
            borderRadius: "5px",
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  )
}

export default Pay
