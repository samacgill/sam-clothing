import { createSelector } from "reselect";
// import memoize from "lodash.memoize";
// import ShopActionTypes from "./shop.types";
//????memoize to do Lecture 149 didn't make sense

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);
//turns shop object into an array with collections in order
//so can be mapped collections-overview (same as original shop array before we changed to object)
//nb initial state now has no collections so if no collections return empty array (to stop error)
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);
//similarly if load
export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );
export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

// The !! forces any value to return true (as boolean) if it's truthy
//so in this case if there is something other than null
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
