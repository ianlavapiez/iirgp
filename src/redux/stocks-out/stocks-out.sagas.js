import { takeLatest, put, all, call } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import StockOutsActionsTypes from "./stocks-out.types";
import { firestore } from "../../firebase/firebase.utils";
import {
  addStockOutFailure,
  addStockOutSuccess,
  deleteStockOutFailure,
  deleteStockOutSuccess,
  retrieveStockOutsFailure,
  retrieveStockOutsSuccess,
  updateStockOutFailure,
  updateStockOutSuccess,
} from "./stocks-out.actions";

function* addStockOut({
  payload: { currentCost, name, sellingPrice, sizeColor, stockNumber },
}) {
  try {
    const id = uuidv4();
    const reference = yield firestore.collection("stocksOut").doc(id);

    yield reference.set({
      currentCost,
      id,
      name,
      quantity: 0,
      sellingPrice,
      sizeColor,
      stockNumber,
    });

    yield retrieveStockOuts();
    yield put(addStockOutSuccess());
  } catch (error) {
    yield put(addStockOutFailure(error.message));
  }
}

function* deleteStockOut({ payload: { id } }) {
  try {
    yield firestore.collection("stocksOut").doc(id).delete();

    yield retrieveStockOuts();
    yield put(deleteStockOutSuccess());
  } catch (error) {
    yield put(deleteStockOutFailure(error.message));
  }
}

function* retrieveStockOuts() {
  try {
    const reference = yield firestore.collection("stocksOut");
    const snapshot = yield reference.get();

    if (snapshot.empty) {
      yield put(retrieveStockOutsSuccess([]));
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

      yield put(retrieveStockOutsSuccess(allData));
    }
  } catch (error) {
    yield put(retrieveStockOutsFailure(error.message));
  }
}

function* updateStockOut({
  payload: { currentCost, id, name, sellingPrice, sizeColor, stockNumber },
}) {
  try {
    const reference = yield firestore.collection("stocksOut").doc(id);

    yield reference.update({
      currentCost,
      id,
      name,
      sellingPrice,
      sizeColor,
      stockNumber,
    });
    yield retrieveStockOuts();
    yield put(updateStockOutSuccess());
  } catch (error) {
    yield put(updateStockOutFailure(error.message));
  }
}

function* onAddStockOutStart() {
  yield takeLatest(StockOutsActionsTypes.ADD_STOCK_OUT_START, addStockOut);
}

function* onDeleteStockOutStart() {
  yield takeLatest(
    StockOutsActionsTypes.DELETE_STOCK_OUT_START,
    deleteStockOut
  );
}

function* onRetrieveStockOutsStart() {
  yield takeLatest(
    StockOutsActionsTypes.RETRIEVE_STOCK_OUTS_START,
    retrieveStockOuts
  );
}

function* onUpdateStockOutStart() {
  yield takeLatest(
    StockOutsActionsTypes.UPDATE_STOCK_OUT_START,
    updateStockOut
  );
}

export function* stockOutsSaga() {
  yield all([
    call(onAddStockOutStart),
    call(onDeleteStockOutStart),
    call(onRetrieveStockOutsStart),
    call(onUpdateStockOutStart),
  ]);
}
