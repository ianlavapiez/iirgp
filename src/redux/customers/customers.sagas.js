import { takeLatest, put, all, call } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import CustomersActionsTypes from "./customers.types";
import { firestore } from "../../firebase/firebase.utils";
import {
  addCustomerFailure,
  addCustomerSuccess,
  deleteCustomerFailure,
  deleteCustomerSuccess,
  retrieveCustomersFailure,
  retrieveCustomersSuccess,
  updateCustomerFailure,
  updateCustomerSuccess,
} from "./customers.actions";

function* addCustomer({ payload: { address, contactNumber, fullName } }) {
  try {
    const id = uuidv4();
    const reference = yield firestore.collection("customers").doc(id);

    yield reference.set({
      address,
      contactNumber,
      fullName,
      id,
    });

    yield retrieveCustomers();
    yield put(addCustomerSuccess());
  } catch (error) {
    yield put(addCustomerFailure(error.message));
  }
}

function* deleteCustomer({ payload: { id } }) {
  try {
    yield firestore.collection("customers").doc(id).delete();

    yield retrieveCustomers();
    yield put(deleteCustomerSuccess());
  } catch (error) {
    yield put(deleteCustomerFailure(error.message));
  }
}

function* retrieveCustomers() {
  try {
    const reference = yield firestore.collection("customers");
    const snapshot = yield reference.get();

    if (snapshot.empty) {
      yield put(retrieveCustomersSuccess([]));
    } else {
      let allData = [];

      snapshot.forEach((doc) => {
        let data = {
          ...doc.data(),
          id: doc.id,
          key: doc.id,
        };

        allData.push(data);
      });

      yield put(retrieveCustomersSuccess(allData));
    }
  } catch (error) {
    yield put(retrieveCustomersFailure(error.message));
  }
}

function* updateCustomer({
  payload: { address, contactNumber, fullName, id },
}) {
  try {
    const reference = yield firestore.collection("customers").doc(id);

    yield reference.update({ address, contactNumber, fullName, id });
    yield retrieveCustomers();
    yield put(updateCustomerSuccess());
  } catch (error) {
    yield put(updateCustomerFailure(error.message));
  }
}

function* onAddCustomerStart() {
  yield takeLatest(CustomersActionsTypes.ADD_CUSTOMER_START, addCustomer);
}

function* onDeleteCustomerStart() {
  yield takeLatest(CustomersActionsTypes.DELETE_CUSTOMER_START, deleteCustomer);
}

function* onRetrieveCustomersStart() {
  yield takeLatest(
    CustomersActionsTypes.RETRIEVE_CUSTOMERS_START,
    retrieveCustomers
  );
}

function* onUpdateCustomerStart() {
  yield takeLatest(CustomersActionsTypes.UPDATE_CUSTOMER_START, updateCustomer);
}

export function* customersSaga() {
  yield all([
    call(onAddCustomerStart),
    call(onDeleteCustomerStart),
    call(onRetrieveCustomersStart),
    call(onUpdateCustomerStart),
  ]);
}
