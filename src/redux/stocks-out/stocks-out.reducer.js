import StockOutsActionsTypes from "./stocks-out.types";

const INITIAL_STATE = {
  actionLoading: false,
  error: null,
  isSuccessful: false,
  loading: false,
  stockOuts: [],
};

const stockOutsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StockOutsActionsTypes.RETRIEVE_STOCK_OUTS_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case StockOutsActionsTypes.ADD_STOCK_OUT_START:
    case StockOutsActionsTypes.DELETE_STOCK_OUT_START:
    case StockOutsActionsTypes.UPDATE_STOCK_OUT_START:
      return {
        ...state,
        error: null,
        actionLoading: true,
        isSuccessful: false,
      };
    case StockOutsActionsTypes.RETRIEVE_STOCK_OUTS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        stockOuts: action.payload,
      };
    case StockOutsActionsTypes.ADD_STOCK_OUT_SUCCESS:
    case StockOutsActionsTypes.DELETE_STOCK_OUT_SUCCESS:
    case StockOutsActionsTypes.UPDATE_STOCK_OUT_SUCCESS:
      return {
        ...state,
        actionLoading: false,
        error: null,
        isSuccessful: true,
      };
    case StockOutsActionsTypes.ADD_STOCK_OUT_RESTART:
    case StockOutsActionsTypes.DELETE_STOCK_OUT_RESTART:
    case StockOutsActionsTypes.UPDATE_STOCK_OUT_RESTART:
      return {
        ...state,
        actionLoading: false,
        isSuccessful: false,
      };
    case StockOutsActionsTypes.ADD_STOCK_OUT_FAILURE:
    case StockOutsActionsTypes.DELETE_STOCK_OUT_FAILURE:
    case StockOutsActionsTypes.RETRIEVE_STOCK_OUTS_FAILURE:
    case StockOutsActionsTypes.UPDATE_STOCK_OUT_FAILURE:
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

export default stockOutsReducer;
