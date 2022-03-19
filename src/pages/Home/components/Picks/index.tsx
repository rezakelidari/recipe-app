import React, { useEffect, useState } from "react";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { apiKey } from "../../../../helper/statics";

import "@splidejs/splide/dist/css/splide.min.css";
import "./Picks.scss";
import {
  checkStorage,
  readItem,
  saveItem,
} from "../../../../helper/localStorage";
import FoodItem from "../../../../components/FoodItem";

export enum picksTypes {
  popular = "populars",
  vegies = "vegies",
}

export default function Picks({
  type,
  perPage,
}: {
  type: picksTypes;
  perPage: number;
}) {
  const [populars, setPopular] = useState<any[]>([]);
  const [{ errorState, errorMessage }, setError] = useState({
    errorState: false,
    errorMessage: "",
  });
  const width: number =
    window.screenX > 0 ? window.screenX : window.screen.availWidth;

  useEffect(() => {
    checkStorage(type)
      ? setPopular(readItem(type))
      : axios
          .get(
            `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=6`
          )
          .then((response) => {
            setPopular(response.data.recipes);
            saveItem(type, response.data.recipes);
          })
          .catch((error) =>
            setError({ errorState: true, errorMessage: error.message })
          );
  }, []);

  return (
    <div className="picksMain">
      <div className="container">
        <h3>
          {type === picksTypes.popular ? "Popular Foods" : "Vegetarian Foods"}
        </h3>
        {errorState ? (
          <div className="error">{errorMessage}</div>
        ) : (
          <Splide
            options={{
              type: "loop",
              perPage: width > 768 ? perPage : 1,
              arrows: false,
              pagination: false,
              gap: 15,
            }}
          >
            {populars.map((item) => (
              <Item
                title={item.title}
                image={item.image}
                id={item.id}
                key={item.title}
              />
            ))}
          </Splide>
        )}
      </div>
    </div>
  );
}

function Item({
  title,
  image,
  id,
}: {
  title: string;
  image: string;
  id: number;
}) {
  return (
    <SplideSlide>
      <FoodItem id={id} title={title} image={image} />
    </SplideSlide>
  );
}
