import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { setOrderDetails } from "./../../redux/Orders/orders.actions";

const columns = [
  {
    id: "productThumbnail",
    lable: "",
  },
  {
    id: "productName",
    lable: "Name",
  },
  {
    id: "productPrice",
    lable: "Preis",
  },
  {
    id: "quantity",
    lable: "Menge",
  },
];

const styles = {
  fontSize: "16px",
  width: "10%",
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "productPrice":
      return `€ ${columnValue}`;
    case "productThumbnail":
      return <img src={columnValue} width={250} />;

    default:
      return columnValue;
  }
};

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();
  const orderItems = order && order.orderItems;

  useEffect(() => {
    return () => {
      dispatch(setOrderDetails({}));
    };
  }, []);

  return (
    <TableContainer>
      {window.innerWidth > 700 ? (
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, pos) => {
                return (
                  <TableCell key={pos} style={styles}>
                    {col.lable}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(orderItems) &&
              orderItems.length > 0 &&
              orderItems.map((row, pos) => {
                return (
                  <TableRow key={pos}>
                    {columns.map((col, pos) => {
                      const columnName = col.id;
                      const columnValue = row[columnName];
                      return (
                        <TableCell key={pos} style={styles}>
                          {formatText(columnName, columnValue)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableBody>
            {Array.isArray(orderItems) &&
              orderItems.length > 0 &&
              orderItems.map((row, pos) => {
                return (
                  <TableRow key={pos}>
                    {columns.map((col, pos) => {
                      const columnName = col.id;
                      const columnValue = row[columnName];
                      return (
                        <p key={pos} style={styles}>
                          {formatText(columnName, columnValue)}
                        </p>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default OrderDetails;
