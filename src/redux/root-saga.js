import { all, call } from "redux-saga/effects";
import { customersSaga } from "./customers/customers.sagas";
import { productsSaga } from "./products/products.sagas";
import { userSaga } from "./user/user.sagas";

export default function* rootSaga() {
  yield all([call(customersSaga), call(productsSaga), call(userSaga)]);
}
