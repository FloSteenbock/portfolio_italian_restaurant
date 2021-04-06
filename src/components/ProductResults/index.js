import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchProductsStart } from "./../../redux/Products/products.action";

import Product from "./Product";
import FormSelect from "./../forms/FormSelect";
import LoadMore from "./../LoadMore";

import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  console.log(filterType);
  const { products } = useSelector(mapState);
  // console.log(products);

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };

  if (!Array.isArray(data)) return null;

  if (data.length < 1) {
    return (
      <div className="products">
        <p>No search results.</p>
      </div>
    );
  }

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Alle Produkte",
        value: "",
      },
      {
        name: "Pasta",
        value: "pasta",
      },
      {
        name: "Cocktail",
        value: "cocktail",
      },
    ],
    handleChange: handleFilter,
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="products">
      <h1>Produkte</h1>

      <FormSelect {...configFilters} />

      <div className="productResults">
        {data.map((product, pos) => {
          const {
            documentID,
            productThumbnail,
            productName,
            productPrice,
          } = product;
          // console.log(product);

          if (
            !documentID ||
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;

          const configProduct = {
            ...product,
          };
          // console.log(configProduct);

          return <Product {...configProduct} key={pos} />;
        })}
      </div>
      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  );
};

export default ProductResults;
