import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";

const columns = [
  {
    id: "orderCreatedDate",
    lable: "Bestelldatum",
  },
  {
    id: "documentID",
    lable: "Bestellnummer",
  },
  {
    id: "orderTotal",
    lable: "Summe",
  },
];

const styles = {
  fontSize: "16px",
  cursor: "pointer",
  width: "10%",
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "orderTotal":
      return `€ ${columnValue}`;
    case "orderCreatedDate":
      return moment(columnValue.seconds * 1000).format("DD/MM/YYYY");
    default:
      return columnValue;
  }
};

const OrderHistory = ({ orders }) => {
  const history = useHistory();
  return (
    <TableContainer>
      {window.innerWidth > 700 ? (
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, pos) => {
                const { lable } = column;
                return (
                  <TableCell key={pos} style={styles}>
                    {lable}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(orders) &&
              orders.length > 0 &&
              orders.map((row, pos) => {
                const { documentID } = row;

                return (
                  <TableRow
                    key={pos}
                    onClick={() => history.push(`/order/${documentID}`)}
                  >
                    {columns.map((column, pos) => {
                      const columnName = column.id;
                      const columnValue = row[columnName];
                      const formattedText = formatText(columnName, columnValue);
                      return (
                        <TableCell key={pos} style={styles}>
                          {formattedText}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      ) : (
        <TableBody>
          {Array.isArray(orders) &&
            orders.length > 0 &&
            orders.map((row, pos) => {
              const { documentID } = row;

              return (
                <TableRow
                  key={pos}
                  style={styles}
                  onClick={() => history.push(`/order/${documentID}`)}
                >
                  {columns.map((column, pos) => {
                    const columnName = column.id;
                    const columnValue = row[columnName];
                    const formattedText = formatText(columnName, columnValue);
                    return <p key={pos}>{formattedText}</p>;
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      )}
    </TableContainer>
  );
};

export default OrderHistory;
