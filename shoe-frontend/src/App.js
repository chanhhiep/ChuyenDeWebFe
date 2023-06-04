import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Product from './pages/Admin/product';
import HomePage from './pages/HomePage';
import AppProvider from './context/AppContext';
import Toasts from "./components/Toasts";
// import { Provider } from 'react-redux';
// import React, { Fragment } from 'react';
// import store from './store/store'

function App() {
  const [visible, setVisible] = useState(false);
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
        <AppProvider>         
          <Toasts />
          <Routes>
            {/*<React.Fragment>*/}
            <Route exact path="/" element={<HomePage />} />
            {/* <Provider store={store}> */}
            <Route path="AdminProduct" element={<Product />} />
            {/* </Provider> */}
            {/* </React.Fragment> */}
            {/*<Route path="/payment/check" element={<CheckPaymentStatus />} />*/}
            {/* <Route path="/search/" */}
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
