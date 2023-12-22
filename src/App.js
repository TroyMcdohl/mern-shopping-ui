import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import HomePage from "./HomePage/pages/HomePage";
import Botbar from "./botbar/Botbar";
import Products from "./ProductPage/pages/Products";
import ProductDetail from "./ProductPage/pages/ProductDetail";
import ProductCart from "./ProductPage/pages/ProductCart";
import UserPanel from "./userinfo/components/UserPanel";
import UserPassword from "./userinfo/components/UserPassword";
import UserProfile from "./userinfo/components/UserProfile";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { AuthContext } from "./context/AuthContext";
import Admin from "./Admin";
import Pay from "./payment/Pay";
import Success from "./payment/Success";
import PasswordForgot from "./auth/PasswordForgot";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";

const App = () => {
  const currentUser = useContext(AuthContext).current_user;
  return (
    <Router>
      <Navbar />

      {currentUser ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/success" element={<Success />} />
          <Route path="/userpanel" element={<UserPanel />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/userpassword" element={<UserPassword />} />

          <Route path="/cart" element={<ProductCart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:pid" element={<ProductDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<ProductCart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:pid" element={<ProductDetail />} />
          <Route path="/forgotpassword" element={<PasswordForgot />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />}></Route>
        </Routes>
      )}

      {currentUser && <Botbar />}
    </Router>
  );
};

export default App;
