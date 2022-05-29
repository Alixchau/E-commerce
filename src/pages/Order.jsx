import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LoadOrders } from '../redux/apiCalls';

const Container = styled.div`
`
const Wrapper = styled.div`
 padding: 20px;
 ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const TextDiv = styled.div`
  height: 40vh;
`
const Text = styled.h4`
  font-weight: 400;
  text-align: center;
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Summary = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
`;
const OrderSummary = styled.div`
  margin: 20px auto;
  padding: 30px auto;
`
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 20px auto;
`;
const OrderTitle = styled.h3`
  font-weight: 200;
  text-align: left;
  color: black;
`
const ItemTitle = styled.h4`
  font-weight: 200;
  text-align: left;
  color: black;
  margin: 10px auto;
`;
const ItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
const ItemDes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: flex-end;
`
const ItemImg = styled.img`
  width: 100px;
`;
const ItmeColorDesc = styled.div`
display: flex;
justify-content: end;
`
const ItemColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-left: 5px;
`
const ItemQuantity = styled.span`
`
const ItemPrice = styled.span`
`
const ItemSize = styled.span`
`
const SummaryPrice = styled.h3`
  font-weight: 600;
  font-size: 20px;
  text-align: right;
  color: black;
  margin: 10px auto;
`

const Order = () => {
  const { orders, orderQuantity } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  //console.log(orders);

  //api call to load cart
  useEffect(() => {
    LoadOrders(dispatch, currentUser._id);
  }, []);


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR ORDERS</Title>
        {
          orderQuantity === 0 ? <TextDiv><Text>You don't have any orders yet..</Text></TextDiv> :
            (
              <Summary>
                <OrderSummary>
                  {orders?.map(perOrder => (
                    <>
                      <OrderTitle>Order Id: {perOrder._id}</OrderTitle>
                      {

                        perOrder.products?.map(product => (
                          <>
                            <ItemTitle>Product name: {product.title}</ItemTitle>
                            <ItemDiv>
                              <ItemImg src={product.img} />
                              <ItemDes>
                                <ItmeColorDesc>Color:<ItemColor color={product.color} /></ItmeColorDesc>
                                <ItemSize>Size: {product.size} </ItemSize>
                                <ItemQuantity>Item quantity: {product.quantity}</ItemQuantity>
                                <ItemPrice>Item Price: ${product.price * product.quantity}</ItemPrice>
                              </ItemDes>
                            </ItemDiv>
                          </>
                        ))
                      }
                      <SummaryPrice>Total: ${perOrder.amount}</SummaryPrice>
                      <Hr />
                    </>
                  ))
                  }
                </OrderSummary>
              </Summary>
            )
        }
      </Wrapper>
      <Footer />
    </Container>
  )
};

export default Order;
