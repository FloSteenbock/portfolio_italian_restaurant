import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "./../../forms/Button";
import { addProduct } from "./../../../redux/Cart/cart.actions";

const Product = (product) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { documentID, productThumbnail, productName, productPrice } = product;

  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  const configAddToCartBtn = {
    type: "button",
  };

  const handleAddToCart = (product) => {
    // console.log(product);
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  return (
    <div className="product">
      <div className="thumb">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>

      <div className="details">
        <ul>
          <li>
            <span className="name">
              <Link to={`/product/${documentID}`}>{productName}</Link>
            </span>
          </li>
          <li>
            <span className="price">€ {productPrice}</span>
          </li>
          <li>
            <div className="addToCart">
              <Button
                {...configAddToCartBtn}
                onClick={() => {
                  handleAddToCart(product);
                }}
              >
                In den Warenkorb
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
