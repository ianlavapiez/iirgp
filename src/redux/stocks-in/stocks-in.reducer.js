import StockInsActionsTypes from "./stocks-in.types";

const INITIAL_STATE = {
  actionLoading: false,
  error: null,
  isSuccessful: false,
  loading: false,
  stockIns: [],
};

const stockInsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StockInsActionsTypes.RETRIEVE_STOCK_INS_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case StockInsActionsTypes.ADD_STOCK_IN_START:
    case StockInsActionsTypes.DELETE_STOCK_IN_START:
    case StockInsActionsTypes.UPDATE_STOCK_IN_START:
      return {
        ...state,
        error: null,
        actionLoading: true,
        isSuccessful: false,
      };
    case StockInsActionsTypes.RETRIEVE_STOCK_INS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        stockIns: action.payload,
      };
    case StockInsActionsTypes.ADD_STOCK_IN_SUCCESS:
    case StockInsActionsTypes.DELETE_STOCK_IN_SUCCESS:
    case StockInsActionsTypes.UPDATE_STOCK_IN_SUCCESS:
      return {
        ...state,
        actionLoading: false,
        error: null,
        isSuccessful: true,
      };
    case StockInsActionsTypes.ADD_STOCK_IN_RESTART:
    case StockInsActionsTypes.DELETE_STOCK_IN_RESTART:
    case StockInsActionsTypes.UPDATE_STOCK_IN_RESTART:
      return {
        ...state,
        actionLoading: false,
        isSuccessful: false,
      };
    case StockInsActionsTypes.ADD_STOCK_IN_FAILURE:
    case StockInsActionsTypes.DELETE_STOCK_IN_FAILURE:
    case StockInsActionsTypes.RETRIEVE_STOCK_INS_FAILURE:
    case StockInsActionsTypes.UPDATE_STOCK_IN_FAILURE:
      return {
        ...state,
        actionLoading: false,
        error: action.payload,
        isSuccessful: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default stockInsReducer;
