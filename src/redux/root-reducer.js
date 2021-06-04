import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import customersReducer from "./customers/customers.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  customers: customersReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
