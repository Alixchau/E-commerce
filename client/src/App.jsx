import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from './pages/Cart';
import Order from "./pages/Order";
import PaymentSuccess from "./pages/PaymentSuccess";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector(state=>state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={!user ? <Navigate to="/" /> : <Cart />} />    
        <Route path="/order" element={!user ? <Navigate to="/" /> : <Order />} />     
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />        
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/success" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
};

export default App;