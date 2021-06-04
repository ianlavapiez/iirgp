import { takeLatest, put, all, call } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import ProductsActionsTypes from "./products.types";
import { firestore } from "../../firebase/firebase.utils";
import {
  addProductFailure,
  addProductSuccess,
  deleteProductFailure,
  deleteProductSuccess,
  retrieveProductsFailure,
  retrieveProductsSuccess,
  updateProductFailure,
  updateProductSuccess,
} from "./products.actions";

function* addProduct({
  payload: { currentCost, name, sellingPrice, sizeColor, stockNumber },
}) {
  try {
    const id = uuidv4();
    const reference = yield firestore.collection("products").doc(id);

    yield reference.set({
      currentCost,
      id,
      name,
      sellingPrice,
      sizeColor,
      stockNumber,
    });

    yield retrieveProducts();
    yield put(addProductSuccess());
  } catch (error) {
    yield put(addProductFailure(error.message));
  }
}

function* deleteProduct({ payload: { id } }) {
  try {
    yield firestore.collection("products").doc(id).delete();

    yield retrieveProducts();
    yield put(deleteProductSuccess());
  } catch (error) {
    yield put(deleteProductFailure(error.message));
  }
}

function* retrieveProducts() {
  try {
    const reference = yield firestore.collection("products");
    const snapshot = yield reference.get();

    if (snapshot.empty) {
      yield put(retrieveProductsSuccess([]));
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

      yield put(retrieveProductsSuccess(allData));
    }
  } catch (error) {
    yield put(retrieveProductsFailure(error.message));
  }
}

function* updateProduct({
  payload: { currentCost, id, name, sellingPrice, sizeColor, stockNumber },
}) {
  try {
    const reference = yield firestore.collection("products").doc(id);

    yield reference.update({
      currentCost,
      id,
      name,
      sellingPrice,
      sizeColor,
      stockNumber,
    });
    yield retrieveProducts();
    yield put(updateProductSuccess());
  } catch (error) {
    yield put(updateProductFailure(error.message));
  }
}

function* onAddProductStart() {
  yield takeLatest(ProductsActionsTypes.ADD_PRODUCT_START, addProduct);
}

function* onDeleteProductStart() {
  yield takeLatest(ProductsActionsTypes.DELETE_PRODUCT_START, deleteProduct);
}

function* onRetrieveProductsStart() {
  yield takeLatest(
    ProductsActionsTypes.RETRIEVE_PRODUCTS_START,
    retrieveProducts
  );
}

function* onUpdateProductStart() {
  yield takeLatest(ProductsActionsTypes.UPDATE_PRODUCT_START, updateProduct);
}

export function* productsSaga() {
  yield all([
    call(onAddProductStart),
    call(onDeleteProductStart),
    call(onRetrieveProductsStart),
    call(onUpdateProductStart),
  ]);
}
