import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// import pages
import OrdersBasket from "./pages/OrdersBasket";
import StockList from "./pages/StockList";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<StockList/>} />
        <Route exact path="/orders-basket" element={<OrdersBasket/>} />
      </Routes>
    </>
  );
}

export default App;
