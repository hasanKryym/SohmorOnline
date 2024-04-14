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
import Categories from "./pages/Admins/ShopAdmin/Categories/Categories";
import { CategoriesProvider } from "./context/Shop/Categories/CategoriesContext";
import { ProductProvider } from "./context/Shop/Products/ProductsContext";
import { UserProvider } from "./context/User/UserContext";
import SiteAdminPanel from "./pages/Admins/SiteAdmin/SiteAdminPanel/SiteAdminPanel";
import { ShopProvider } from "./context/Shop/shops/ShopsContext";
import Domains from "./pages/Admins/SiteAdmin/Domains/Domains";
import { DomainProvider } from "./context/Shop/Domains/DomainsContext";
import EditShop from "./pages/Admins/ShopAdmin/EditShop/EditShop";
import AddShop from "./pages/Admins/SiteAdmin/AddShop/AddShop";
import BackNavigationHandler from "./components/BackNavigationHandler/BackNavigationHandler";
import { CartProvider } from "./context/Cart/CartContext";
import SliderImages from "./pages/Admins/ShopAdmin/SliderImages/SliderImages";
import Favorites from "./pages/Profile/Favorites/Favorites";
import RouteChangeListener from "./components/RouteChangeListener/RouteChangeListener";
import RegistrationRequests from "./pages/Admins/SiteAdmin/RegistrationRequests/RegistrationRequests";
import ShopRegistration from "./pages/ShopRegistration/ShopRegistration";

function App() {
  return (
    <>
      <NotificationProvider>
        <Router>
          <UserProvider>
            <ShopProvider>
              <DomainProvider>
                <ProductProvider>
                  <CategoriesProvider>
                    <Notification />
                    <CartProvider>
                      <ScrollToTop />
                      <RouteChangeListener />
                      {/* <BackNavigationHandler /> */}
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route
                          path="/profile/favorites"
                          element={<Favorites />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/shops" element={<Shops />} />
                        <Route
                          path="/shops/register"
                          element={<ShopRegistration />}
                        />
                        <Route path="/shops/:id" element={<Shop />} />
                        <Route
                          path="/shops/products/:id"
                          element={<Product />}
                        />
                        <Route
                          path="/shops/adminPanel/dashboard"
                          element={<ShopAdminPanel />}
                        />
                        <Route
                          path="/shops/adminPanel/manage/categories"
                          element={<Categories />}
                        />
                        <Route
                          path="/siteAdmin/adminPanel/dashboard"
                          element={<SiteAdminPanel />}
                        />
                        <Route
                          path="/siteAdmin/adminPanel/domains"
                          element={<Domains />}
                        />
                        <Route
                          path="/siteAdmin/adminPanel/registrationRequests"
                          element={<RegistrationRequests />}
                        />
                        <Route
                          path="/shops/adminPanel/manage/editShop"
                          element={<EditShop />}
                        />
                        <Route
                          path="/siteAdmin/adminPanel/manage/addShop"
                          element={<AddShop />}
                        />
                        <Route
                          path="/shops/adminPanel/manage/sliderImages"
                          element={<SliderImages />}
                        />
                      </Routes>
                    </CartProvider>
                  </CategoriesProvider>
                </ProductProvider>
              </DomainProvider>
            </ShopProvider>
          </UserProvider>
        </Router>
      </NotificationProvider>
    </>
  );
}

export default App;
