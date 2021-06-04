import CustomersActionsTypes from "./customers.types";

export const addCustomerStart = (data) => ({
  type: CustomersActionsTypes.ADD_CUSTOMER_START,
  payload: data,
});

export const addCustomerSuccess = () => ({
  type: CustomersActionsTypes.ADD_CUSTOMER_SUCCESS,
});

export const addCustomerFailure = (error) => ({
  type: CustomersActionsTypes.ADD_CUSTOMER_FAILURE,
  payload: error,
});

export const addCustomerRestart = () => ({
  type: CustomersActionsTypes.ADD_CUSTOMER_RESTART,
});

export const deleteCustomerStart = (data) => ({
  type: CustomersActionsTypes.DELETE_CUSTOMER_START,
  payload: data,
});

export const deleteCustomerSuccess = () => ({
  type: CustomersActionsTypes.DELETE_CUSTOMER_SUCCESS,
});

export const deleteCustomerFailure = (error) => ({
  type: CustomersActionsTypes.DELETE_CUSTOMER_FAILURE,
  payload: error,
});

export const deleteCustomerRestart = () => ({
  type: CustomersActionsTypes.DELETE_CUSTOMER_RESTART,
});

export const retrieveCustomersStart = () => ({
  type: CustomersActionsTypes.RETRIEVE_CUSTOMERS_START,
});

export const retrieveCustomersSuccess = (data) => ({
  type: CustomersActionsTypes.RETRIEVE_CUSTOMERS_SUCCESS,
  payload: data,
});

export const retrieveCustomersFailure = (error) => ({
  type: CustomersActionsTypes.RETRIEVE_CUSTOMERS_FAILURE,
  payload: error,
});

export const updateCustomerStart = (data) => ({
  type: CustomersActionsTypes.UPDATE_CUSTOMER_START,
  payload: data,
});

export const updateCustomerSuccess = () => ({
  type: CustomersActionsTypes.UPDATE_CUSTOMER_SUCCESS,
});

export const updateCustomerFailure = (error) => ({
  type: CustomersActionsTypes.UPDATE_CUSTOMER_FAILURE,
  payload: error,
});

export const updateCustomerRestart = () => ({
  type: CustomersActionsTypes.UPDATE_CUSTOMER_RESTART,
});
