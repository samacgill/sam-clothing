import { createSelector } from "reselect";
import memoize from "lodash.memoize";
//????memoize to do Lecture 149 didn't make sense

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);
//turns shop object into an array with collections in order
//so can be mapped collections-overview (same as original shop array before we changed to object)
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  );
