import React from "react";
import { Link } from "react-router-dom";
import ShopPasta from "./../../assets/pasta.jpg";
import ShopCocktail from "./../../assets/cocktail.jpg";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{ backgroundImage: `url(${ShopCocktail})` }}
        >
          <Link to="/search/cocktail">Cocktail</Link>
        </div>
        <div className="item" style={{ backgroundImage: `url(${ShopPasta})` }}>
          <Link to="/search/pasta">Pasta</Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
