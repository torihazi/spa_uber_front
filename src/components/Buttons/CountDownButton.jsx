import React from "react";

import { RoundButton } from "../shared_style";

export const CountDownButton = (props) => {
  const { onClick, isDisabled } = props;

  return (
    <RoundButton onClick={onClick} disabled={isDisabled}>
      -
    </RoundButton>
  );
};
