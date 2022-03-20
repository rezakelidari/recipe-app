import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { checkStorage, readItem, saveItem } from "../../helper/localStorage";
import { apiKey } from "../../helper/statics";

import { BiDollar, BiLike, BiTrash } from "react-icons/bi";

import "./FoodInfo.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IState } from "../../states/cartCounters/cartReducer";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { BsCartPlus } from "react-icons/bs";
import {
  addItem,
  itemDecrease,
  itemIncrease,
  removeItem,
} from "../../states/cartCounters/cartActions";

export default function FoodInfo() {
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
  const id = useParams().id as string;
  const navigate = useNavigate();

  const cartItems: IState = useSelector((state: RootStateOrAny) => state);
  const dispatch = useDispatch();

  const isInCart: boolean = cartItems.selectedItems.some(
    (item) => item.id === parseInt(id)
  );

  const quantity: number = isInCart
    ? (cartItems.selectedItems.find((item) => item.id === parseInt(id))
        ?.quantity as number)
    : 0;

  useEffect(() => {
    if (id === undefined) {
      navigate("/");
    } else {
      if (checkStorage(id)) {
        setFoodInfo({
          foodTitle: readItem(id).title,
          foodImage: readItem(id).image,
          foodDesc: readItem(id).summary,
          foodPrice: readItem(id).pricePerServing.toFixed(2),
          foodLikes: readItem(id).aggregateLikes,
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
            saveItem(id, response.data);
            setLoading(false);
          })
          .catch((error) => {
            setError({ errorState: true, errorMessage: error.message });
            setLoading(false);
          });
      }
    }
  }, []);

  return (
    <div className="foodMain">
      {loading ? (
        <div className="loading">Loading ...</div>
      ) : errorState ? (
        <div className="error">{errorMessage}</div>
      ) : (
        <>
          <div className="left">
            <img src={foodImage} alt={foodTitle} className="image" />
            {isInCart ? (
              <div
                className={"cartMenu"}
                onClick={(event) => event.preventDefault()}
              >
                <button
                  onClick={() =>
                    !(quantity < 1) &&
                    (quantity === 1
                      ? dispatch(removeItem(parseInt(id)))
                      : dispatch(itemDecrease(parseInt(id))))
                  }
                  className={`${quantity < 1 && "fadeMinus"}`}
                >
                  {quantity > 1 ? <AiOutlineMinus /> : <BiTrash />}
                </button>
                <input type="text" readOnly value={quantity} />
                <button onClick={() => dispatch(itemIncrease(parseInt(id)))}>
                  <AiOutlinePlus />
                </button>
              </div>
            ) : (
              <button
                className={"cartAdd"}
                onClick={(event) => (
                  event.preventDefault(), dispatch(addItem(parseInt(id)))
                )}
              >
                Add to Cart
                <BsCartPlus />
              </button>
            )}
          </div>
          <div className="right">
            <h2 className="title">{foodTitle}</h2>
            <div className="details">
              <div className="item">
                Price:
                <span>
                  {foodPrice}
                  <BiDollar />
                </span>
              </div>
              <div className="item">
                <span>{foodLikes}</span>Likes
                <BiLike />
              </div>
            </div>
            <br />
            <p
              className="desc"
              dangerouslySetInnerHTML={{ __html: foodDesc }}
            ></p>
          </div>
        </>
      )}
    </div>
  );
}
