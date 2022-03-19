import React, { useEffect, useState } from "react";
import { FaHamburger, FaPizzaSlice } from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { BsUiRadiosGrid } from "react-icons/bs";
import {
  checkStorage,
  readItem,
  saveItem,
} from "../../../../helper/localStorage";
import axios from "axios";
import { apiKey } from "../../../../helper/statics";
import FoodItem from "../../../../components/FoodItem";

import "./Foods.scss";

export default function Foods() {
  enum categories {
    all = "",
    italian = "italian",
    american = "american",
    thai = "thai",
  }

  const [foods, setFoods] = useState<any[]>([]);
  const [{ errorState, errorMessage }, setError] = useState({
    errorState: false,
    errorMessage: "",
  });
  const [loading, setLoading] = useState(true);
  const [selectedCategory, selectCategory] = useState(categories.all);

  useEffect(() => {
    if (checkStorage("foods")) {
      setFoods(readItem("foods"));
      setLoading(false);
    } else {
      axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`
        )
        .then((response) => {
          setFoods(response.data.results);
          saveItem("foods", response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          setError({ errorState: true, errorMessage: error.message });
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    if (
      checkStorage(
        `foods${
          selectedCategory !== categories.all ? `-${selectedCategory}` : ""
        }`
      )
    ) {
      setFoods(
        readItem(
          `foods${
            selectedCategory !== categories.all ? `-${selectedCategory}` : ""
          }`
        )
      );
      setLoading(false);
    } else {
      axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}${
            selectedCategory !== categories.all
              ? `&cuisine=${selectedCategory}`
              : ""
          }`
        )
        .then((response) => {
          setFoods(response.data.results);
          saveItem(
            `foods${
              selectedCategory !== categories.all ? `-${selectedCategory}` : ""
            }`,
            response.data.results
          );
          setLoading(false);
        })
        .catch((error) => {
          setError({ errorState: true, errorMessage: error.message });
          setLoading(false);
        });
    }
  }, [selectedCategory]);

  return (
    <div className="foodsMain">
      {loading ? (
        <div className="loading">Loading ...</div>
      ) : errorState ? (
        <div className="error">{errorMessage}</div>
      ) : (
        <>
          <div className="categories">
            <div
              className="item"
              onClick={() => selectCategory(categories.all)}
            >
              <BsUiRadiosGrid />
              <h4 className="title">All</h4>
            </div>
            <div
              className="item"
              onClick={() => selectCategory(categories.italian)}
            >
              <FaPizzaSlice />
              <h4 className="title">Italian</h4>
            </div>
            <div
              className="item"
              onClick={() => selectCategory(categories.american)}
            >
              <FaHamburger />
              <h4 className="title">American</h4>
            </div>
            <div
              className="item"
              onClick={() => selectCategory(categories.thai)}
            >
              <GiNoodles />
              <h4 className="title">Thai</h4>
            </div>
          </div>

          <div className="foods">
            {foods.map((food) => (
              <FoodItem
                id={food.id}
                title={food.title}
                image={food.image}
                key={food.id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
