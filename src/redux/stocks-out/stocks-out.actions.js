import StockOutsActionsTypes from "./stocks-out.types";

export const addStockOutStart = (data) => ({
  type: StockOutsActionsTypes.ADD_STOCK_OUT_START,
  payload: data,
});

export const addStockOutSuccess = () => ({
  type: StockOutsActionsTypes.ADD_STOCK_OUT_SUCCESS,
});

export const addStockOutFailure = (error) => ({
  type: StockOutsActionsTypes.ADD_STOCK_OUT_FAILURE,
  payload: error,
});

export const addStockOutRestart = () => ({
  type: StockOutsActionsTypes.ADD_STOCK_OUT_RESTART,
});

export const deleteStockOutStart = (data) => ({
  type: StockOutsActionsTypes.DELETE_STOCK_OUT_START,
  payload: data,
});

export const deleteStockOutSuccess = () => ({
  type: StockOutsActionsTypes.DELETE_STOCK_OUT_SUCCESS,
});

export const deleteStockOutFailure = (error) => ({
  type: StockOutsActionsTypes.DELETE_STOCK_OUT_FAILURE,
  payload: error,
});

export const deleteStockOutRestart = () => ({
  type: StockOutsActionsTypes.DELETE_STOCK_OUT_RESTART,
});

export const retrieveStockOutsStart = () => ({
  type: StockOutsActionsTypes.RETRIEVE_STOCK_OUTS_START,
});

export const retrieveStockOutsSuccess = (data) => ({
  type: StockOutsActionsTypes.RETRIEVE_STOCK_OUTS_SUCCESS,
  payload: data,
});

export const retrieveStockOutsFailure = (error) => ({
  type: StockOutsActionsTypes.RETRIEVE_STOCK_OUTS_FAILURE,
  payload: error,
});

export const updateStockOutStart = (data) => ({
  type: StockOutsActionsTypes.UPDATE_STOCK_OUT_START,
  payload: data,
});

export const updateStockOutSuccess = () => ({
  type: StockOutsActionsTypes.UPDATE_STOCK_OUT_SUCCESS,
});

export const updateStockOutFailure = (error) => ({
  type: StockOutsActionsTypes.UPDATE_STOCK_OUT_FAILURE,
  payload: error,
});

export const updateStockOutRestart = () => ({
  type: StockOutsActionsTypes.UPDATE_STOCK_OUT_RESTART,
});
