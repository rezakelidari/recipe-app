import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RootStateOrAny, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./Navbar.scss";

export default function Navbar() {
  const cartItems = useSelector((state: RootStateOrAny) => state).selectedItems;

  return (
    <nav>
      <NavLink to="/" className="title">
        Recipe App
      </NavLink>
      <NavLink to="/cart" className="cart">
        <AiOutlineShoppingCart />
        <span className="itemsNumber">{cartItems.length}</span>
      </NavLink>
    </nav>
  );
}
