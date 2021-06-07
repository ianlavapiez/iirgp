import { takeLatest, put, all, call } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import StockInsActionsTypes from "./stocks-in.types";
import { firestore } from "../../firebase/firebase.utils";
import {
  addStockInFailure,
  addStockInSuccess,
  deleteStockInFailure,
  deleteStockInSuccess,
  retrieveStockInsFailure,
  retrieveStockInsSuccess,
  updateStockInFailure,
  updateStockInSuccess,
} from "./stocks-in.actions";

function* addStockIn({
  payload: { date, month, quantity, selectedProduct, year },
}) {
  try {
    const id = uuidv4();
    const reference = yield firestore.collection("stocksIn").doc(id);

    yield reference.set({
      date,
      month,
      quantity,
      selectedProduct,
      year,
    });

    yield retrieveStockIns();
    yield put(addStockInSuccess());
  } catch (error) {
    yield put(addStockInFailure(error.message));
  }
}

function* deleteStockIn({ payload: { id } }) {
  try {
    yield firestore.collection("stocksIn").doc(id).delete();

    yield retrieveStockIns();
    yield put(deleteStockInSuccess());
  } catch (error) {
    yield put(deleteStockInFailure(error.message));
  }
}

function* retrieveStockIns() {
  try {
    const reference = yield firestore.collection("stocksIn");
    const snapshot = yield reference.get();

    if (snapshot.empty) {
      yield put(retrieveStockInsSuccess([]));
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

      yield put(retrieveStockInsSuccess(allData));
    }
  } catch (error) {
    yield put(retrieveStockInsFailure(error.message));
  }
}

function* updateStockIn({
  payload: { date, id, month, quantity, selectedProduct, year },
}) {
  try {
    const reference = yield firestore.collection("stocksIn").doc(id);

    yield reference.update({
      date,
      id,
      month,
      quantity,
      selectedProduct,
      year,
    });
    yield retrieveStockIns();
    yield put(updateStockInSuccess());
  } catch (error) {
    yield put(updateStockInFailure(error.message));
  }
}

function* onAddStockInStart() {
  yield takeLatest(StockInsActionsTypes.ADD_STOCK_IN_START, addStockIn);
}

function* onDeleteStockInStart() {
  yield takeLatest(StockInsActionsTypes.DELETE_STOCK_IN_START, deleteStockIn);
}

function* onRetrieveStockInsStart() {
  yield takeLatest(
    StockInsActionsTypes.RETRIEVE_STOCK_INS_START,
    retrieveStockIns
  );
}

function* onUpdateStockInStart() {
  yield takeLatest(StockInsActionsTypes.UPDATE_STOCK_IN_START, updateStockIn);
}

export function* stockInsSaga() {
  yield all([
    call(onAddStockInStart),
    call(onDeleteStockInStart),
    call(onRetrieveStockInsStart),
    call(onUpdateStockInStart),
  ]);
}
