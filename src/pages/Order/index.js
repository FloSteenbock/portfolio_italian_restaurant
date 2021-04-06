import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailsStart } from "./../../redux/Orders/orders.actions";
import OrderDetails from "./../../components/OrderDetails";

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
});

const Order = () => {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(mapState);
  const { orderTotal } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID));
  }, []);

  return (
    <div>
      <h1>Bestellnummer: #{orderID}</h1>
      <OrderDetails order={orderDetails} />
      <h3>Summe: € {orderTotal}</h3>
    </div>
  );
};

export default Order;
