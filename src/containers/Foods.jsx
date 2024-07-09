import React, { useEffect, useReducer, useState } from "react";

import styled from "styled-components";
import { COLORS } from "../style_constants";
import { LocalMallIcon } from "../components/Icons";

import { Skeleton } from "@mui/material";
import { FoodWrapper } from "../components/FoodWrapper";

import MainLogo from "../images/logo.png";
import FoodImage from "../images/food-image.jpg";
import { FoodOrderDialog } from "../components/FoodOrderDialog";

import { fetchFoods } from "../apis/foods";
import { REQUEST_STATE } from "../constants";
import { Link, useParams } from "react-router-dom";
import {
  foodsReducer,
  initialState as foodsInitialState,
  foodsActionTypes,
} from "../reducers/foods";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;
const MainLogoImage = styled.img`
  height: 90px;
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

const Foods = () => {
  const { restaurantId } = useParams();
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
  };
  const [state, setState] = useState(initialState);

  const submitOrder = () => {
    console.log("登録ボタンが押された");
  };

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
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {foodsState.fetchState === REQUEST_STATE.LOADING ? (
          <>
            {[...Array(12).keys()].map((i) => (
              <ItemWrapper key={i}>
                <Skeleton key={i} variant="rect" width={450} height={180} />
              </ItemWrapper>
            ))}
          </>
        ) : (
          foodsState.foodsList.map((food) => (
            <ItemWrapper key={food.id}>
              <FoodWrapper
                food={food}
                onClickFoodWrapper={(food) => {
                  setState({
                    ...state,
                    isOpenOrderDialog: true,
                    selectedFood: food,
                  });
                }}
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
      {state.isOpenOrderDialog && (
        <FoodOrderDialog
          food={state.selectedFood}
          isOpen={state.isOpenOrderDialog}
          countNumber={state.selectedFoodCount}
          onClickCountUp={() => {
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount + 1,
            });
          }}
          onClickCountDown={() => {
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount - 1,
            });
          }}
          onClickOrder={() => submitOrder()}
          onClose={() =>
            setState({
              ...state,
              isOpenOrderDialog: false,
              selectedFood: null,
            })
          }
        />
      )}
    </>
  );
};

export default Foods;
