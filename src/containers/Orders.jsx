import React from "react";
import { useParams } from "react-router-dom";

const Orders = () => {
  const { restaurantsId } = useParams();

  return <div>RestaurantsIDは{restaurantsId}です</div>;
};

export default Orders;
