import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "./../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import "./styles.scss";
import Button from "./../forms/Button";
import Item from "./Item";
import ItemSmall from "./ItemSmall";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const Checkout = ({}) => {
  const history = useHistory();
  const { cartItems, total } = useSelector(mapState);
  console.log(window.innerWidth);
  return (
    <div className="checkout">
      <h1>Warenkorb</h1>

      <div className="cart">
        {window.innerWidth > 700 ? (
          cartItems.length > 0 ? (
            <table border="0" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <table
                    className="checkoutHeader"
                    border="0"
                    cellPadding="10"
                    cellSpacing="0"
                  >
                    <tbody>
                      <tr>
                        <th>Produkt</th>
                        <th>Beschreibung</th>
                        <th>Menge</th>
                        <th>Preis</th>
                        <th>Löschen</th>
                      </tr>
                    </tbody>
                  </table>
                </tr>

                <tr>
                  <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                      {cartItems.map((item, pos) => {
                        return (
                          <tr key={pos}>
                            <td>
                              <Item {...item} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </tr>

                <tr>
                  <table
                    align="right"
                    border="0"
                    cellSpacing="0"
                    cellPadding="10"
                  >
                    <tr align="right">
                      <td>
                        <h3>Summe: € {total}</h3>
                      </td>
                    </tr>
                    <tr>
                      <table border="0" cellSpacing="0" cellPadding="10">
                        <tbody>
                          <tr>
                            <td>
                              <Button onClick={() => history.goBack()}>
                                weiter Shoppen
                              </Button>
                            </td>
                            <td>
                              <Button onClick={() => history.push("/payment")}>
                                Zur Kasse gehen
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </tr>
                  </table>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Es befinden sich keine Produkte im Warenkorb.</p>
          )
        ) : cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                {cartItems.map((item, pos) => {
                  return (
                    <tr key={pos}>
                      <td className="itemSmall">
                        <ItemSmall {...item} />
                      </td>
                    </tr>
                  );
                })}
              </tr>

              <tr>
                <table
                  align="right"
                  border="0"
                  cellSpacing="0"
                  cellPadding="10"
                >
                  <tr align="right">
                    <td>
                      <h3>Summe: € {total}</h3>
                    </td>
                  </tr>
                  <tr>
                    <table border="0" cellSpacing="0" cellPadding="10">
                      <tbody>
                        <tr>
                          <td>
                            <Button onClick={() => history.goBack()}>
                              weiter Shoppen
                            </Button>
                          </td>
                          <td>
                            <Button onClick={() => history.push("/payment")}>
                              zur Kasse gehen
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </tr>
                </table>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Es befinden sich keine Produkte im Warenkorb.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
