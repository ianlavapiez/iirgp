import ProductsActionsTypes from "./products.types";

export const addProductStart = (data) => ({
  type: ProductsActionsTypes.ADD_PRODUCT_START,
  payload: data,
});

export const addProductSuccess = () => ({
  type: ProductsActionsTypes.ADD_PRODUCT_SUCCESS,
});

export const addProductFailure = (error) => ({
  type: ProductsActionsTypes.ADD_PRODUCT_FAILURE,
  payload: error,
});

export const addProductRestart = () => ({
  type: ProductsActionsTypes.ADD_PRODUCT_RESTART,
});

export const deleteProductStart = (data) => ({
  type: ProductsActionsTypes.DELETE_PRODUCT_START,
  payload: data,
});

export const deleteProductSuccess = () => ({
  type: ProductsActionsTypes.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailure = (error) => ({
  type: ProductsActionsTypes.DELETE_PRODUCT_FAILURE,
  payload: error,
});

export const deleteProductRestart = () => ({
  type: ProductsActionsTypes.DELETE_PRODUCT_RESTART,
});

export const retrieveProductsStart = () => ({
  type: ProductsActionsTypes.RETRIEVE_PRODUCTS_START,
});

export const retrieveProductsSuccess = (data) => ({
  type: ProductsActionsTypes.RETRIEVE_PRODUCTS_SUCCESS,
  payload: data,
});

export const retrieveProductsFailure = (error) => ({
  type: ProductsActionsTypes.RETRIEVE_PRODUCTS_FAILURE,
  payload: error,
});

export const updateProductStart = (data) => ({
  type: ProductsActionsTypes.UPDATE_PRODUCT_START,
  payload: data,
});

export const updateProductSuccess = () => ({
  type: ProductsActionsTypes.UPDATE_PRODUCT_SUCCESS,
});

export const updateProductFailure = (error) => ({
  type: ProductsActionsTypes.UPDATE_PRODUCT_FAILURE,
  payload: error,
});

export const updateProductRestart = () => ({
  type: ProductsActionsTypes.UPDATE_PRODUCT_RESTART,
});

export const updateQuantityStart = (data) => ({
  type: ProductsActionsTypes.UPDATE_QUANTITY_START,
  payload: data,
});

export const updateQuantitySuccess = () => ({
  type: ProductsActionsTypes.UPDATE_QUANTITY_SUCCESS,
});

export const updateQuantityFailure = (error) => ({
  type: ProductsActionsTypes.UPDATE_QUANTITY_FAILURE,
  payload: error,
});
