import { createSelector } from "reselect";

const productsSelector = (state) => state.products;

export const getProducts = createSelector(
  [productSelector],
  (state) => state.list
);
