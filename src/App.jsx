import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from './pages/Cart';
import Pay from "./pages/Pay";
import PaymentSuccess from "./pages/PaymentSuccess";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={ <PaymentSuccess />} />        
      </Routes>
    </Router>
  );
};

export default App;