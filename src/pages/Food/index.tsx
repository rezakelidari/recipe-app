import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { checkStorage, readItem, saveItem } from "../../helper/localStorage";
import { apiKey } from "../../helper/statics";

import { BiDollar, BiLike } from "react-icons/bi";

import "./Food.scss";

export default function Food() {
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
  const [error, setError] = useState({ state: false, message: "" });
  const id = useParams().id as string;
  const navigate = useNavigate();

  useEffect(() => {
    if (id === undefined) {
      navigate("/");
    } else {
      checkStorage(id)
        ? setFoodInfo({
            foodTitle: readItem(id).title,
            foodImage: readItem(id).image,
            foodDesc: readItem(id).summary,
            foodPrice: readItem(id).pricePerServing / readItem(id).servings,
            foodLikes: readItem(id).aggregateLikes,
          })
        : axios
            .get(
              `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
            )
            .then((response) => {
              setFoodInfo({
                foodTitle: response.data.title,
                foodImage: response.data.image,
                foodDesc: response.data.summary,
                foodPrice:
                  response.data.pricePerServing / response.data.servings,
                foodLikes: response.data.aggregateLikes,
              });
              saveItem(id, response.data);
              console.log(response.data);
            })
            .catch((error) =>
              setError({ state: true, message: error.message })
            );
    }
  }, []);

  return (
    <div className="foodMain">
      <img src={foodImage} alt={foodTitle} className="image" />
      <div className="info">
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
        <p className="desc" dangerouslySetInnerHTML={{ __html: foodDesc }}></p>
      </div>
    </div>
  );
}
