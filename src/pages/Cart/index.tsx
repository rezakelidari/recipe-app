import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { checkStorage, readItem, saveItem } from "../../helper/localStorage";
import { apiKey } from "../../helper/statics";
import { clear, removeItem } from "../../states/cartCounters/cartActions";
import { IState } from "../../states/cartCounters/cartReducer";

import "./Cart.scss";

export default function Cart() {
  const cartItems: IState = useSelector((state: RootStateOrAny) => state);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(0);
    cartItems.selectedItems.forEach((item) => {
      if (checkStorage(item.id.toString())) {
        setPrice((prevState) =>
          parseFloat(
            (
              prevState +
              readItem(item.id.toString()).pricePerServing * item.quantity
            ).toFixed(2)
          )
        );
      } else {
        axios
          .get(
            `https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${apiKey}`
          )
          .then((response) => {
            saveItem(item.id.toString(), response.data);
            setPrice((prevState) =>
              parseFloat(
                (
                  prevState +
                  response.data.pricePerServing * item.quantity
                ).toFixed(2)
              )
            );
          });
      }
    });
  }, [cartItems.selectedItems]);

  return (
    <div className="cartMain">
      {cartItems.selectedItems.length === 0 ? (
        <div className="empty">Cart is empty</div>
      ) : (
        <>
          <div className="left">
            {cartItems.selectedItems.map((item) => (
              <CartItem
                id={item.id}
                quantity={item.quantity}
                dispatch={dispatch}
                key={item.id}
              />
            ))}
          </div>
          <div className="right">
            <h2 className="heading">Invoice</h2>
            <br />
            <div className="item">
              <h3>Total:</h3>
              <span>{cartItems.selectedItems.length}</span>
            </div>
            <div className="item">
              <h3>Price:</h3>
              <span>{price}</span>
            </div>
            <br />
            <div className="buttons">
              <button
                onClick={() => {
                  setTimeout(() => dispatch(clear()), 500);
                }}
              >
                Checkout
              </button>
              <button
                className="secondary"
                onClick={() => {
                  dispatch(clear());
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CartItem({
  id,
  quantity,
  dispatch,
}: {
  id: number;
  quantity: number;
  dispatch: Dispatch;
}) {
  const [
    { foodTitle, foodImage, foodDesc, foodPrice, foodLikes },
    setFoodInfo,
  ] = useState({
    foodTitle: "",
    foodImage: "",
    foodDesc: "",
    foodPrice: 0,
    foodLikes: "",
  });
  const [{ errorState, errorMessage }, setError] = useState({
    errorState: false,
    errorMessage: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (checkStorage(id.toString())) {
      setFoodInfo({
        foodTitle: readItem(id.toString()).title,
        foodImage: readItem(id.toString()).image,
        foodDesc: readItem(id.toString()).summary,
        foodPrice: readItem(id.toString()).pricePerServing.toFixed(2),
        foodLikes: readItem(id.toString()).aggregateLikes,
      });
      setLoading(false);
    } else {
      axios
        .get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        )
        .then((response) => {
          setFoodInfo({
            foodTitle: response.data.title,
            foodImage: response.data.image,
            foodDesc: response.data.summary,
            foodPrice: response.data.pricePerServing / response.data.servings,
            foodLikes: response.data.aggregateLikes,
          });
          saveItem(id.toString(), response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError({ errorState: true, errorMessage: error.message });
          setLoading(false);
        });
    }
  }, []);

  return (
    <Link
      className="cartItem"
      to={!loading && !errorState ? `/food/${id}` : "/cart"}
    >
      {loading ? (
        <div className="loading">Loading ...</div>
      ) : errorState ? (
        <div className="error">{errorMessage}</div>
      ) : (
        <>
          <img className="banner" src={foodImage} alt={foodTitle} />
          <h3 className="title">{foodTitle}</h3>
          <span className="quantity">x{quantity}</span>
          <button
            className="remove"
            onClick={(event) => (
              event.preventDefault(), dispatch(removeItem(id))
            )}
          >
            <BiTrash />
          </button>
        </>
      )}
    </Link>
  );
}
