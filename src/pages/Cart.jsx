import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../makeRequest";
import { addProduct, newCart, decreaseProduct } from "../redux/cartRedux";
import { CreateCart, LoadCart, UpdateCart } from "../redux/apiCalls";
import { style } from "@mui/system";

const PUBLISHABLE_stripekey = "pk_test_51L1ck6D2bTqVrtoS5iNwhb3MsPmh7VJHN5TBvMbrD6tFjKHBZa7MsmT3fONAkL7vt8tRqcQMAGOs8smVastBym1R00DYOCJf4V";

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
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const EmptyBagButton = styled.button`
    padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: "filled";
  background-color:black;
  color: white;
  display: flex;
  margin: 15px auto;
`
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props => props.type === "filled" && "none"};
  background-color: ${props => props.type === "filled" ? "black" : "transparent"};
  color: ${props => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  ${mobile({ display: "none" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ProductName = styled.div``;
const ProductId = styled.div``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;
const ProductColorSection = styled.div`
  display: flex;
`
const ProductSize = styled.div``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "4px 50px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const { currentUser } = useSelector(state => state.user);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(cart);
  //generate stripeToken
  const onToken = (token) => {
    setStripeToken(token);
  };

  //if there's stripeToken, make backend request
  useEffect(() => {
    const makeBackendRequest = async () => {
      try {
        const response = await userRequest.post(
          "/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate("/success", {
          state: { //pass state to success page
            stripeData: response.data,
            cart: cart
          }
        }
        );
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeBackendRequest(); //only make request if there's an stripe token
  }, [stripeToken, cart.total, navigate]);

  const changeQuantity = (type, product, cart) => {
    if (type === "decrease") {
      dispatch(decreaseProduct(product));
    } else {
      dispatch(addProduct(product));
      UpdateCart(cart);
    }
  };

  //api call to update cart
  useEffect(() => {
    UpdateCart(cart);
  }, [cart]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        {
          cart.quantity <= 0 ?
            <>
              <EmptyBagButton onClick={() => navigate("/")}>CONTINUE SHOPPING</EmptyBagButton>
              <Title>Your bag is empty</Title>

            </>
            :
            <>
              <Top>
                <TopButton onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                  <TopText>Shopping Bag({cart.quantity})</TopText>
                  <TopText>Your Wishlist(0)</TopText>
                </TopTexts>
                <StripeCheckout
                  name='LOLA Shop'
                  billingAddress
                  shippingAddress
                  description={`Your total is $ ${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  stripeKey={PUBLISHABLE_stripekey}
                >
                  <TopButton type="filled">CHECKOUT NOW</TopButton>
                </StripeCheckout>
              </Top>
              <Bottom>
                <Info>
                  {
                    cart.products.map(product => (
                      <>
                        <Product>
                          <ProductDetail>
                            <Image src={product.img} />
                            <Details>
                              <ProductName><b>Product:</b> {product.title}</ProductName>
                              <ProductId><b>ID:</b> {product._id}</ProductId>
                              <ProductColorSection>
                                <b>Color: </b>
                                <ProductColor color={product.color} />
                              </ProductColorSection>

                              <ProductSize><b>Size:</b> {product.size}</ProductSize>
                            </Details>
                          </ProductDetail>
                          <PriceDetail>
                            <ProductAmountContainer>
                              <RemoveIcon style={{ cursor: 'pointer' }} onClick={() => changeQuantity("decrease", product)} />
                              <ProductAmount>{product.quantity}</ProductAmount>
                              <AddIcon style={{ cursor: 'pointer' }} onClick={() => changeQuantity("increase", product)} />
                            </ProductAmountContainer>
                            <ProductPrice>
                              $ {product.price * product.quantity}
                            </ProductPrice>
                          </PriceDetail>
                        </Product>
                        <Hr />
                      </>
                    ))
                  }
                </Info>
                <Summary>
                  <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                  <SummaryItem>
                    <SummaryItemText>Subtotal</SummaryItemText>
                    <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Shipping Discount</SummaryItemText>
                    <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem type="total">
                    <SummaryItemText >Total</SummaryItemText>
                    <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                  </SummaryItem>
                  <StripeCheckout
                    name='LOLA Shop'
                    billingAddress
                    shippingAddress
                    description={`Your total is $ ${cart.total}`}
                    amount={cart.total * 100}
                    token={onToken}
                    stripeKey={PUBLISHABLE_stripekey}
                  >
                    <Button >CHECKOUT NOW</Button>

                  </StripeCheckout>
                </Summary>
              </Bottom>

            </>
        }
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
