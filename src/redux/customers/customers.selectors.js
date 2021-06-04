import { createSelector } from "reselect";

const selectCustomers = (state) => state.customers;

export const selectIsActionLoading = createSelector(
  [selectCustomers],
  (customers) => customers.actionLoading
);

export const selectAllCustomers = createSelector(
  [selectCustomers],
  (customers) => customers.customers
);

export const selectIsLoading = createSelector(
  [selectCustomers],
  (customers) => customers.loading
);

export const selectIsSuccessful = createSelector(
  [selectCustomers],
  (customers) => customers.isSuccessful
);

export const selectError = createSelector(
  [selectCustomers],
  (customers) => customers.error
);
