import React from "react";
import Foods from "./components/Foods";
import Picks, { picksTypes } from "./components/Picks";

import "./Home.scss";

export default function Home() {
  return (
    <div className="homeMain">
      <Picks type={picksTypes.popular} perPage={4} />
      <Picks type={picksTypes.vegies} perPage={3} />
      <br />
      <Foods />
    </div>
  );
}
