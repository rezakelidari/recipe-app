import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import FoodInfo from "./pages/FoodInfo";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food/" element={<FoodInfo />}>
            <Route path="/food/:id" element={<FoodInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
