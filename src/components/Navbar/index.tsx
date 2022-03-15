import React from "react";
import { Link, NavLink } from "react-router-dom";

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
