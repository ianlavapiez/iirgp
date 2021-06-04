import { createSelector } from "reselect";

const selectProducts = (state) => state.products;

export const selectIsActionLoading = createSelector(
  [selectProducts],
  (products) => products.actionLoading
);

export const selectAllProducts = createSelector(
  [selectProducts],
  (products) => products.products
);

export const selectIsLoading = createSelector(
  [selectProducts],
  (products) => products.loading
);

export const selectIsSuccessful = createSelector(
  [selectProducts],
  (products) => products.isSuccessful
);

export const selectError = createSelector(
  [selectProducts],
  (products) => products.error
);
