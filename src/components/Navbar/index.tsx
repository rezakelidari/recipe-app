import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.scss";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/" className="title">
        Recipe App
      </NavLink>
    </nav>
  );
}
