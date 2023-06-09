import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Product from './pages/Admin/product';
import AdminCategory from './pages/Admin/category';
import AdminLogin from './pages/Admin/Login';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import ProductClient from './pages/ProductPage';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';
import Success from './pages/SuccessPage';
import WishList from './pages/WishList';
import Login from './pages/Login';
import Register from './pages/Register';
import {AuthProvider}from './context/authContext';
import Toasts from "./components/Toasts";
// import { Provider } from 'react-redux';
// import React, { Fragment } from 'react';
// import store from './store/store'

function App() {
  const [visible, setVisible] = useState(false);
  let user = localStorage.getItem("user");
  user = JSON.parse(JSON.stringify(user));
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);
  return (
    <>
      <div
        id={`scrollToTop`}
        className={`${visible && "show"}`}
        onClick={scrollToTop}
      >
        <i className="bx bx-chevrons-up"></i>
      </div>
      <BrowserRouter>
        <AuthProvider userData={user}>         
          <Toasts />
          <Routes>
            {/*<React.Fragment>*/}
            <Route exact path="/" element={<Login />} />
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="Cart" element={<Cart />} />
            <Route path="Register" element={<Register />} />
            <Route path="DetailsPage/:id" element={<DetailsPage />} />
            <Route path="ProductPage/:id" element={<ProductClient />} />
            <Route path="OrderHistory" element={<OrderHistory />} />
            <Route path="WishList" element={<WishList />} />
            <Route path="Success" element={<Success />} />
            {/* <Provider store={store}> */}
            <Route path="AdminProduct" element={<Product />} />
            <Route path="AdminCategory" element={<AdminCategory />} />
            <Route path="AdminLogin" element={<AdminLogin />} />
            
            {/* </Provider> */}
            {/* </React.Fragment> */}
            {/*<Route path="/payment/check" element={<CheckPaymentStatus />} />*/}
            {/* <Route path="/search/" */}
            {/* <ProtectedRoute path="/rtl" component={RtlLayout} />
            <Route path="/auth" component={AuthLayout} />  */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
