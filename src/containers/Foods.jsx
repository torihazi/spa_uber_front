import React, { useEffect, useReducer } from "react";

import { fetchFoods } from "../apis/foods";
import { REQUEST_STATE } from "../constants";
import { useParams } from "react-router-dom";
import {
  foodsReducer,
  initialState as foodsInitialState,
  foodsActionTypes,
} from "../reducers/foods";

const Foods = () => {
  const { restaurantId } = useParams();
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(restaurantId).then((data) => {
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload: {
          foods: data.foods,
        },
      });
    });
  }, []);

  return (
    <>
      {foodsState.fetchState === REQUEST_STATE.LOADING ? (
        <>
          <p>ロード中...</p>
        </>
      ) : (
        foodsState.foodsList.map((food) => <div key={food.id}>{food.name}</div>)
      )}
    </>
  );
};

export default Foods;
