import React from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "./../../../redux/Cart/cart.actions";
import Button from "./../../forms/Button";

const ItemSmall = (product) => {
  const dispatch = useDispatch();
  const {
    productName,
    productThumbnail,
    productPrice,
    quantity,
    documentID,
  } = product;

  const handleRemoveCartItem = (documentID) => {
    dispatch(
      removeCartItem({
        documentID,
      })
    );
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product));
  };

  return (
    <>
      <img
        className="cartSmallImage"
        src={productThumbnail}
        alt={productName}
      />
      <h2 className="cartSmallName">{productName}</h2>
      <p>
        <span className="cartBtn" onClick={() => handleReduceItem(product)}>
          {`< `}
        </span>
        <span>{quantity}</span>
        <span
          className="cartBtn"
          onClick={() => handleAddProduct(product)}
        >{` >`}</span>
      </p>
      <h4 className="cartSmallPrice">€ {productPrice}</h4>
      <Button>
        <span
          className="cartBtn"
          onClick={() => handleRemoveCartItem(documentID)}
        >
          Produkt entfernen
        </span>
      </Button>
    </>
  );
};

export default ItemSmall;
