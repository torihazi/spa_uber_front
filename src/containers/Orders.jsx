import React from "react";
import { useParams } from "react-router-dom";

const Orders = () => {
  const { restaurantId } = useParams();

  return <div>RestaurantsIDは{restaurantId}です</div>;
};

export default Orders;
