import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.componenet";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

//if no match dispatch to props, dispatch is available as prop anyway so can use for individual dispatches
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);
//using selector here ensures cart items aren't re-rendered every time the state changes (vid 131 7.15)
//however acc to correction mapStateTo props has a shallow equality check so won't needlessly re-render
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});
//withRouter gives functions access to history object. Order of wrapping matters
export default withRouter(connect(mapStateToProps)(CartDropdown));
