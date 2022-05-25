import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { mobile } from "../responsive";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { publicRequest } from "../makeRequest";
import { style } from "@mui/system";
import { Alert } from "@mui/material";


const Container = styled.div``
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}

`;
const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: scale-down;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 30px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option`
`;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [pickColorSize, setPickColorSize] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await publicRequest.get(`/products/find/${id}`);
        setProduct(response.data);
      } catch (error) {

      }
    }
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "decrease") {
      setQuantity(quantity > 1 ? quantity - 1 : quantity);
    } else {
      setQuantity(quantity + 1);
    }
  }

  const handleAddCart = () => {
    //update cart
    console.log(color);
    console.log(size);
    if (color !=="" && size!=="") {
      dispatch(addProduct({ ...product, quantity, color, size }));
    }
    else {
      setPickColorSize(true);
    }
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.Title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>${product.price}</Price>

          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {
                product.color?.map((c) =>
                  <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                )
              }

            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize  onChange={(e) => setSize(e.target.value)}>
                {
                  product.size?.map((s) =>
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  )
                }decreaseinc
              </FilterSize>
            </Filter>
          </FilterContainer>
          {
            pickColorSize === true && <Alert severity="info">Please choose color and size</Alert> 
          }
                <Desc>Please choose color and size</Desc>
                <AddContainer>
                  <AmountContainer>
                    <RemoveIcon style={{ cursor: 'pointer' }} onClick={() => handleQuantity("decrease")} />
                    <Amount>{quantity}</Amount>
                    <AddIcon style={{ cursor: 'pointer' }} onClick={() => handleQuantity("increase")} />
                  </AmountContainer>
                  <Button onClick={handleAddCart}>ADD TO CART</Button>
                </AddContainer>                     
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Product
