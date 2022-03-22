import React from "react";

import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footerMain">
      <h3 className="title">Recipe App</h3>
      <div>
        By <a href="https://github.com/rezakelidari">Reza Kelidari</a>
      </div>
      <div>
        Open in <a href="https://github.com/rezakelidari/recipe-app">Github</a>
      </div>
    </footer>
  );
}
