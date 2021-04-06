import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Products/products.action";
import { addProduct } from "./../../redux/Cart/cart.actions";
import Button from "./../../components/forms/Button";
import "./styles.scss";

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productID } = useParams();
  const { product } = useSelector(mapState);
  // console.log(product);
  // console.log(productID);

  const {
    documentID,
    productThumbnail,
    productName,
    productPrice,
    productDesc,
  } = product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const handleAddToCart = (product) => {
    const productWithDocumentID = {
      ...product,
      documentID: productID,
    };
    // console.log(productWithDocumentID);
    if (!productWithDocumentID) return;
    dispatch(addProduct(productWithDocumentID));
    history.push("/cart");
  };

  const configAddToCartBtn = {
    type: "button",
  };

  return (
    <div className="productCard">
      <div className="hero">
        <img src={productThumbnail} />
      </div>
      <div className="productDetails">
        <ul>
          <li>{productName}</li>
          <li>
            <span>€ {productPrice}</span>
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
          <li>
            <span
              className="desc"
              dangerouslySetInnerHTML={{ __html: productDesc }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
