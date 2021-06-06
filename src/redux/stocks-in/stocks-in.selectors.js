import { createSelector } from "reselect";

const selectStockIns = (state) => state.stockIns;

export const selectIsActionLoading = createSelector(
  [selectStockIns],
  (stockIns) => stockIns.actionLoading
);

export const selectAllStockIns = createSelector(
  [selectStockIns],
  (stockIns) => stockIns.stockIns
);

export const selectIsLoading = createSelector(
  [selectStockIns],
  (stockIns) => stockIns.loading
);

export const selectIsSuccessful = createSelector(
  [selectStockIns],
  (stockIns) => stockIns.isSuccessful
);

export const selectError = createSelector(
  [selectStockIns],
  (stockIns) => stockIns.error
);
