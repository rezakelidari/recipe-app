import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import FoodInfo from "./pages/FoodInfo";
import Home from "./pages/Home";
import store from "./states/store";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/food/" element={<FoodInfo />}>
              <Route path="/food/:id" element={<FoodInfo />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
