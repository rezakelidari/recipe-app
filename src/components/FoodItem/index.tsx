import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import "./FoodItem.scss";

export default function FoodItem({
  id,
  title,
  image,
}: {
  id: number;
  title: string;
  image: string;
}) {
  return (
    <Link to={`/food/${id}`}>
      <div key={title} className="foodItem">
        <img src={image} alt={title} className="banner" />
        <div className="gradient"></div>
        <h3 className="title">{title}</h3>
        <div className="cartMenu" onClick={(event) => event.preventDefault()}>
          <button>
            <AiOutlineMinus />
          </button>
          <input type="text" name="" id="" readOnly value={1} />
          <button>
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </Link>
  );
}
