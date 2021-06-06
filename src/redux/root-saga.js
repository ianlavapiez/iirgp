import { all, call } from "redux-saga/effects";
import { customersSaga } from "./customers/customers.sagas";
import { productsSaga } from "./products/products.sagas";
import { stockInsSaga } from "./stocks-in/stocks-in.sagas";
import { userSaga } from "./user/user.sagas";

export default function* rootSaga() {
  yield all([
    call(customersSaga),
    call(productsSaga),
    call(stockInsSaga),
    call(userSaga),
  ]);
}
