import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { mobile, tablet } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/userRedux';
import { logoutCart } from '../redux/cartRedux';
import { logoutOrder } from '../redux/orderRedux';


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })};
  ${tablet({ padding: "10px 20px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ flex: "0" })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}

`;
const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
  cursor: pointer;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: "2", justifyContent: "end" })}

`;

const MenuItem = styled.div`
  font-size: 14px;
  margin-left: 25px;
  cursor: pointer;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user.currentUser);
  const { orderQuantity } = useSelector(state => state.order);


  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutCart());
    dispatch(logoutOrder());
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer >
            <Input placeholder='search' />
            <SearchIcon style={{ color: "gray", fontSize: "16" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={() => navigate("/")}>LOLA</Logo>
        </Center>
        <Right>
          {!user && (
            <>
              <MenuItem onClick={() => navigate("/register")}>REGISTER</MenuItem>
              <MenuItem onClick={() => navigate("/login")}>SIGN IN</MenuItem>
            </>
          )}
          {user && (
            <>
              <MenuItem>Hi, {user.username}</MenuItem>
                <MenuItem onClick={() => navigate("/cart")}>
                  <Badge badgeContent={cart.quantity} color="primary">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </MenuItem>
                <MenuItem  onClick={() => navigate("/order")}>
                  <Badge badgeContent={orderQuantity} color="primary">
                    <LocalShippingOutlinedIcon />
                  </Badge>
                </MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
