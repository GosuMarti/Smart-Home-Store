import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Product from "./pages/Product";
import AboutPage from "./pages/AboutPage";
import Profile from "./pages/Profile";
import CartPage from "./components/ui/productComponents/CartPage";
import ShopInside from "./components/ui/productComponents/ShopInside";
import AddProducts from "./adminPages/AddProducts";
import Orders from "./adminPages/Orders";
import AddUser from "./adminPages/AddUser";
import ProductInfo from "./adminPages/ProductInfo";
import EditProducts from "./adminPages/EditProducts";
import { CartProvider } from "./CartContext";
import ProductEmployee from "./adminPages/ProductEmployee";
import InsideProductEmployee from "./adminPages/InsideProductEmployee";
import PhotoChange from "./components/ui/photoComponents/PhotoChange";

function App() {
  return (
    <>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product" exact element={<Product />} />
          <Route path="/product/:id" element={<ShopInside />} />
          <Route path="/add-product" element={<AddProducts />} />
          <Route path="/users" element={<AddUser />} />
          <Route path="/product-display" element={<ProductInfo />} />
          <Route path="/card" element={<CartPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/edit-product/:id" element={<EditProducts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-photo" element={<PhotoChange />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product-employee" element={<ProductEmployee />} />
          <Route
            path="/productEmployee/:id"
            element={<InsideProductEmployee />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
