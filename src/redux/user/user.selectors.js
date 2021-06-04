import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectError = createSelector([selectUser], (user) => user.error);

export const selectIsLoading = createSelector(
  [selectUser],
  (user) => user.loading
);

export const selectIsSuccessful = createSelector(
  [selectUser],
  (user) => user.isSuccessful
);
