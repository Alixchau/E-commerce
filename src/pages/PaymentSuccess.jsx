import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h3`
  font-weight: 200;
  text-align: center;
  margin: 20px auto;
`;

const PaymentSuccess = () => {

return (
  <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>

     <Title>Successfull. Your order is being prepared...</Title>
    <Link to="/">
      <button style={{ padding: 10, marginTop: 20 }}>Back to Homepage</button>
    </Link>
  </div>
);
};

export default PaymentSuccess;
