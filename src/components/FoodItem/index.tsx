import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { IState } from "../../states/cartCounters/cartReducer";

import "./FoodItem.scss";
import {
  addItem,
  itemDecrease,
  itemIncrease,
  removeItem,
} from "../../states/cartCounters/cartActions";
import { BiTrash } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";

export default function FoodItem({
  id,
  title,
  image,
}: {
  id: number;
  title: string;
  image: string;
}) {
  const cartItems: IState = useSelector((state: RootStateOrAny) => state);
  const dispatch = useDispatch();

  const isInCart: boolean = cartItems.selectedItems.some(
    (item) => item.id === id
  );

  const quantity: number = isInCart
    ? (cartItems.selectedItems.find((item) => item.id === id)
        ?.quantity as number)
    : 0;

  return (
    <Link to={`/food/${id}`}>
      <div key={title} className="foodItem">
        <img src={image} alt={title} className="banner" />
        <div className="gradient"></div>
        <h3 className="title">{title}</h3>
        {isInCart ? (
          <div
            className={"cartMenu"}
            onClick={(event) => event.preventDefault()}
          >
            <button
              onClick={() =>
                !(quantity < 1) &&
                (quantity === 1
                  ? dispatch(removeItem(id))
                  : dispatch(itemDecrease(id)))
              }
              className={`${quantity < 1 && "fadeMinus"}`}
            >
              {quantity > 1 ? <AiOutlineMinus /> : <BiTrash />}
            </button>
            <input type="text" readOnly value={quantity} />
            <button onClick={() => dispatch(itemIncrease(id))}>
              <AiOutlinePlus />
            </button>
          </div>
        ) : (
          <button
            className={"cartAdd"}
            onClick={(event) => (event.preventDefault(), dispatch(addItem(id)))}
          >
            Add to Cart
            <BsCartPlus />
          </button>
        )}
      </div>
    </Link>
  );
}
