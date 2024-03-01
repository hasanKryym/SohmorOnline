import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import { Login, Register } from "./pages/LoginRegister/LoginRegister";
import Shops from "./pages/Shops/Shops";
import Shop from "./pages/Shop/Shop";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Product from "./pages/Product/Product";
import ShopAdminPanel from "./pages/Admins/ShopAdmin/ShopAdminPanel/ShopAdminPanel";
import { NotificationProvider } from "./context/Notification/NotificationContext";
import Notification from "./components/Notification/Notification";

function App() {
  return (
    <>
      <NotificationProvider>
        <Notification />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shops" element={<Shops />} />
            <Route path="/shops/:id" element={<Shop />} />
            <Route path="/shops/products/:id" element={<Product />} />
            <Route path="/shops/adminPanel" element={<ShopAdminPanel />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </>
  );
}

export default App;
