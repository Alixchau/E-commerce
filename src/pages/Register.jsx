import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Registerfunc } from '../redux/apiCalls';
import { useNavigate } from "react-router-dom";
import { registerToHome } from "../redux/userRedux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-top: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width:40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
  margin-left: 15px;
  display: flex;
  align-items: center;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const dispactch = useDispatch();
  const { registerError, registered } = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      Registerfunc(dispactch, { username, email, password });
    }
  };

  const handleLogin = () => {
    //dispactch(registerToHome({ username }));
    navigate("/login");
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} required />
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
          <Input placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
          <Input placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} required />
          <Agreement>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></Agreement>
          <Button onClick={handleRegister}>CREATE</Button>
          {
            !passwordMatch && <Error>Password don't match, please try again</Error>
          }
          {
            registerError && <Error>Something went wrong</Error>
          }
        </Form>
        {registered &&
          <>
            <Title>Registered. Login</Title>
            <br></br>
            <Button onClick={handleLogin}>Login</Button>
          </>
        }
      </Wrapper>
    </Container>
  )
}

export default Register
