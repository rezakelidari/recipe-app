import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { checkStorage, readItem, saveItem } from "../../helper/localStorage";
import { apiKey } from "../../helper/statics";

import { BiDollar, BiLike } from "react-icons/bi";

import "./FoodInfo.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

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

  useEffect(() => {
    if (id === undefined) {
      navigate("/");
    } else {
      if (checkStorage(id)) {
        setFoodInfo({
          foodTitle: readItem(id).title,
          foodImage: readItem(id).image,
          foodDesc: readItem(id).summary,
          foodPrice: (
            readItem(id).pricePerServing / readItem(id).servings
          ).toFixed(2) as unknown as number,
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
            <div
              className="cartMenu"
              onClick={(event) => event.preventDefault()}
            >
              <button>
                <AiOutlineMinus />
              </button>
              <input type="text" name="" id="" readOnly value={1} />
              <button>
                <AiOutlinePlus />
              </button>
            </div>
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
