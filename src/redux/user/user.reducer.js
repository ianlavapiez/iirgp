import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isSuccessful: false,
  loading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.EMAIL_SIGN_IN_START:
    case UserActionTypes.ID_NUMBER_SIGN_IN_START:
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        isSuccessful: false,
        loading: true,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isSuccessful: true,
        loading: false,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isSuccessful: false,
        loading: false,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
        isSuccessful: false,
        loading: false,
      };
    case UserActionTypes.RESTART_USER_REDUCER_START:
      return {
        ...state,
        currentUser: null,
        error: null,
        isSuccessful: false,
        loading: false,
      };
    case UserActionTypes.USER_RESTART:
      return {
        ...state,
        isSuccessful: false,
      };
    default:
      return state;
  }
};

export default userReducer;
