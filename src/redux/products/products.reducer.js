import ProductsActionsTypes from "./products.types";

const INITIAL_STATE = {
  actionLoading: false,
  error: null,
  isSuccessful: false,
  loading: false,
  products: [],
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductsActionsTypes.RETRIEVE_PRODUCTS_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ProductsActionsTypes.ADD_PRODUCT_START:
    case ProductsActionsTypes.DELETE_PRODUCT_START:
    case ProductsActionsTypes.UPDATE_PRODUCT_START:
    case ProductsActionsTypes.UPDATE_QUANTITY_START:
      return {
        ...state,
        error: null,
        actionLoading: true,
        isSuccessful: false,
      };
    case ProductsActionsTypes.RETRIEVE_PRODUCTS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        products: action.payload,
      };
    case ProductsActionsTypes.ADD_PRODUCT_SUCCESS:
    case ProductsActionsTypes.DELETE_PRODUCT_SUCCESS:
    case ProductsActionsTypes.UPDATE_PRODUCT_SUCCESS:
    case ProductsActionsTypes.UPDATE_QUANTITY_SUCCESS:
      return {
        ...state,
        actionLoading: false,
        error: null,
        isSuccessful: true,
      };
    case ProductsActionsTypes.ADD_PRODUCT_RESTART:
    case ProductsActionsTypes.DELETE_PRODUCT_RESTART:
    case ProductsActionsTypes.UPDATE_PRODUCT_RESTART:
      return {
        ...state,
        actionLoading: false,
        isSuccessful: false,
      };
    case ProductsActionsTypes.ADD_PRODUCT_FAILURE:
    case ProductsActionsTypes.DELETE_PRODUCT_FAILURE:
    case ProductsActionsTypes.RETRIEVE_PRODUCTS_FAILURE:
    case ProductsActionsTypes.UPDATE_PRODUCT_FAILURE:
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

export default productsReducer;
