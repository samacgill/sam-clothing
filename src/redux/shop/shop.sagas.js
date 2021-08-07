import { takeLatest, call, put, all } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";
import {
  firestore,
  ConvertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

// asterisk denotes generator function
export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    //similar to async await, returns a promise that gets resolved with the value of the collectionRef
    const snapshot = yield collectionRef.get();
    //use call here from saga (which just invokes function) in case conversion takes some time
    //becasue we're yielding, we're defering control back to saga middleware, so it can eg cancel
    const collectionsMap = yield call(
      ConvertCollectionsSnapshotToMap,
      snapshot
    );
    //put is saga version of dispatch
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
