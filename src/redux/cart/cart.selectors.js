// external library reselect used for memoization here
//? how does this compare with other methods of memoization?
import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, cardItem) => acc + cardItem.quantity, 0)
);
