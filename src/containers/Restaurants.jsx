import React, { useEffect } from "react";
import { fetchRestaurants } from "../apis/restaurants";

const Restaurants = () => {
  useEffect(() => {
    fetchRestaurants().then((res) => {
      console.log(res);
    });
  }, []);

  return <div>Restaurants</div>;
};

export default Restaurants;
