import CustomersActionsTypes from "./customers.types";

const INITIAL_STATE = {
  actionLoading: false,
  error: null,
  isSuccessful: false,
  loading: false,
  customers: [],
};

const customersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomersActionsTypes.RETRIEVE_CUSTOMERS_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CustomersActionsTypes.ADD_CUSTOMER_START:
    case CustomersActionsTypes.DELETE_CUSTOMER_START:
    case CustomersActionsTypes.UPDATE_CUSTOMER_START:
      return {
        ...state,
        error: null,
        actionLoading: true,
        isSuccessful: false,
      };
    case CustomersActionsTypes.RETRIEVE_CUSTOMERS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        customers: action.payload,
      };
    case CustomersActionsTypes.ADD_CUSTOMER_SUCCESS:
    case CustomersActionsTypes.DELETE_CUSTOMER_SUCCESS:
    case CustomersActionsTypes.UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        actionLoading: false,
        error: null,
        isSuccessful: true,
      };
    case CustomersActionsTypes.ADD_CUSTOMER_RESTART:
    case CustomersActionsTypes.DELETE_CUSTOMER_RESTART:
    case CustomersActionsTypes.UPDATE_CUSTOMER_RESTART:
      return {
        ...state,
        actionLoading: false,
        isSuccessful: false,
      };
    case CustomersActionsTypes.ADD_CUSTOMER_FAILURE:
    case CustomersActionsTypes.DELETE_CUSTOMER_FAILURE:
    case CustomersActionsTypes.RETRIEVE_CUSTOMERS_FAILURE:
    case CustomersActionsTypes.UPDATE_CUSTOMER_FAILURE:
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

export default customersReducer;
