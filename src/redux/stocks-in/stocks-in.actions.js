import StockInsActionsTypes from "./stocks-in.types";

export const addStockInStart = (data) => ({
  type: StockInsActionsTypes.ADD_STOCK_IN_START,
  payload: data,
});

export const addStockInSuccess = () => ({
  type: StockInsActionsTypes.ADD_STOCK_IN_SUCCESS,
});

export const addStockInFailure = (error) => ({
  type: StockInsActionsTypes.ADD_STOCK_IN_FAILURE,
  payload: error,
});

export const addStockInRestart = () => ({
  type: StockInsActionsTypes.ADD_STOCK_IN_RESTART,
});

export const deleteStockInStart = (data) => ({
  type: StockInsActionsTypes.DELETE_STOCK_IN_START,
  payload: data,
});

export const deleteStockInSuccess = () => ({
  type: StockInsActionsTypes.DELETE_STOCK_IN_SUCCESS,
});

export const deleteStockInFailure = (error) => ({
  type: StockInsActionsTypes.DELETE_STOCK_IN_FAILURE,
  payload: error,
});

export const deleteStockInRestart = () => ({
  type: StockInsActionsTypes.DELETE_STOCK_IN_RESTART,
});

export const retrieveStockInsStart = () => ({
  type: StockInsActionsTypes.RETRIEVE_STOCK_INS_START,
});

export const retrieveStockInsSuccess = (data) => ({
  type: StockInsActionsTypes.RETRIEVE_STOCK_INS_SUCCESS,
  payload: data,
});

export const retrieveStockInsFailure = (error) => ({
  type: StockInsActionsTypes.RETRIEVE_STOCK_INS_FAILURE,
  payload: error,
});

export const updateStockInStart = (data) => ({
  type: StockInsActionsTypes.UPDATE_STOCK_IN_START,
  payload: data,
});

export const updateStockInSuccess = () => ({
  type: StockInsActionsTypes.UPDATE_STOCK_IN_SUCCESS,
});

export const updateStockInFailure = (error) => ({
  type: StockInsActionsTypes.UPDATE_STOCK_IN_FAILURE,
  payload: error,
});

export const updateStockInRestart = () => ({
  type: StockInsActionsTypes.UPDATE_STOCK_IN_RESTART,
});
