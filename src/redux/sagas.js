import { all } from 'redux-saga/effects';
import { songsSaga } from './songsSlice';

export default function* rootSaga() {
  yield all([songsSaga()]);
}