import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Food from "./pages/Food";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food/" element={<Food />}>
            <Route path="/food/:id" element={<Food />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
