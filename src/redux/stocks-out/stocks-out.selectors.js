import { createSelector } from "reselect";

const selectStockOuts = (state) => state.stockOuts;

export const selectIsActionLoading = createSelector(
  [selectStockOuts],
  (stockOuts) => stockOuts.actionLoading
);

export const selectAllStockOuts = createSelector(
  [selectStockOuts],
  (stockOuts) => stockOuts.stockOuts
);

export const selectIsLoading = createSelector(
  [selectStockOuts],
  (stockOuts) => stockOuts.loading
);

export const selectIsSuccessful = createSelector(
  [selectStockOuts],
  (stockOuts) => stockOuts.isSuccessful
);

export const selectError = createSelector(
  [selectStockOuts],
  (stockOuts) => stockOuts.error
);
