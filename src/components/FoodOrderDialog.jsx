import React from "react";
import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";

import { SubText } from "./StyledText";
import { CountUpButton } from "./Buttons/CountUpButton";
import { CountDownButton } from "./Buttons/CountDownButton";
import { OrderButton } from "./Buttons/OrderButton";

import OrderHeaderImage from "../images/order-header.png";
import styled from "styled-components";

const OrderHeader = styled.img`
  width: 100%;
  height: 350px;
`;

const DescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

const CountersWrapper = styled.div`
  margin-right: auto;
  display: flex;
  padding: 0 16px;
`;

const CountItem = styled.div`
  margin: 0 8px;
`;

const CountNum = styled.div`
  padding-top: 10px;
`;

const OrderTextWrapper = styled.div`
  display: flex;
`;

const OrderButtonTextWrapper = styled.div`
  width: 300px;
`;

const PriceWrapper = styled.div`
  padding-top: 4px;
`;

export const FoodOrderDialog = (props) => {
  const {
    food,
    countNumber,
    isOpen,
    onClose,
    onClickCountUp,
    onClickCountDown,
    onClickOrder,
  } = props;
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <OrderHeader src={OrderHeaderImage} alt="order header" />
      <DialogTitle>{food.name}</DialogTitle>
      <DialogContent>
        <DescriptionWrapper>
          <SubText>{food.description}</SubText>
        </DescriptionWrapper>
      </DialogContent>
      <DialogActions>
        <CountersWrapper>
          <CountItem>
            <CountDownButton
              onClick={() => onClickCountDown()}
              isDisabled={countNumber <= 1}
            />
          </CountItem>
          <CountItem>
            <CountNum>{countNumber}</CountNum>
          </CountItem>
          <CountItem>
            <CountUpButton
              onClick={() => onClickCountUp()}
              isDisabled={countNumber >= 9}
            />
          </CountItem>
        </CountersWrapper>
        <OrderButton onClick={() => onClickOrder()}>
          <OrderTextWrapper>
            <OrderButtonTextWrapper>
              {`${countNumber}点を注文に追加`}
            </OrderButtonTextWrapper>
            <PriceWrapper>{`¥${countNumber * food.price}`}</PriceWrapper>
          </OrderTextWrapper>
        </OrderButton>
      </DialogActions>
    </Dialog>
  );
};
