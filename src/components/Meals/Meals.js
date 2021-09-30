import React, { useEffect, useState } from "react";
import Meal from "../Meal/Meal";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => res.json())
      .then((data) => setMeals(data.meals));
  }, []);

  const handleInput = (event) => {
    const inputText = event.target.value;
    setSearchText(inputText);
  };

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then((res) => res.json())
      .then((data) => setMeals(data.meals));
  }, [searchText]);

  return (
    <div>
      <div className="container mx-auto my-5">
        <label className="flex flex-col-reverse relative focus group">
          <input
            onChange={handleInput}
            type="text"
            name="text"
            required
            className="border-2 border-black px-4 py-3 leading-9"
            placeholder="Search By Food Name"
          />
        </label>
      </div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {meals
              ? meals.map((meal) => <Meal meal={meal} key={meal.idMeal}></Meal>)
              : "not Found"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meals;
