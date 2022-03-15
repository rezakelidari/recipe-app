import React from "react";
import Categories from "./components/Categories";
import Picks, { picksTypes } from "./components/Picks";

import "./Home.scss";

export default function Home() {
  return (
    <div className="homeMain">
      <Picks type={picksTypes.popular} perPage={4} />
      <Picks type={picksTypes.vegies} perPage={3} />
    </div>
  );
}
