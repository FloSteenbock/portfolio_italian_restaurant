import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signOutUserStart } from "./../../redux/User/user.actions";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
import "./styles.scss";
import Logo from "./../../assets/logo.png";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const Header = (props) => {
  const dispatch = useDispatch();
  const { currentUser, totalNumCartItems } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Suche</Link>
            </li>
          </ul>
        </nav>

        <div className="callToActions">
          <ul>
            <li>
              <Link to="/cart">Warenkorb ({totalNumCartItems})</Link>
            </li>
            {currentUser && [
              <li>
                <Link to="/dashboard">Mein Konto</Link>
              </li>,
              <li>
                <span onClick={() => signOut()}>LOGOUT</span>
              </li>,
            ]}
            {!currentUser && [
              <li>
                <Link to="/registration">registrieren</Link>
              </li>,
              <li>
                <Link to="/login">login</Link>
              </li>,
            ]}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
