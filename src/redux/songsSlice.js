import { createSlice } from '@reduxjs/toolkit';
import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

const apiUrl = 'http://localhost:5000'; // Replace with your backend server URL

// Actions
const FETCH_SONGS = 'songs/fetchSongs';
const ADD_SONG = 'songs/addSong';
const UPDATE_SONG = 'songs/updateSong';
const DELETE_SONG = 'songs/deleteSong';

// Action Creators
export const fetchSongs = () => ({ type: FETCH_SONGS });
export const addSong = (title) => ({ type: ADD_SONG, payload: { title } });
export const updateSong = (id, title) => ({ type: UPDATE_SONG, payload: { id, title } });
export const deleteSong = (id) => ({ type: DELETE_SONG, payload: id });

// Sagas
function* fetchSongsSaga() {
  try {
    const response = yield call(axios.get, `${apiUrl}/songs`);
    yield put({ type: 'songs/fetchSongsSuccess', payload: response.data });
  } catch (error) {
    yield put({ type: 'songs/fetchSongsFailure', payload: error.message });
  }
}

function* addSongSaga(action) {
  try {
    const response = yield call(axios.post, `${apiUrl}/songs`, { title: action.payload.title });
    yield put({ type: 'songs/addSongSuccess', payload: response.data });
  } catch (error) {
    yield put({ type: 'songs/addSongFailure', payload: error.message });
  }
}

function* updateSongSaga(action) {
  try {
    const response = yield call(axios.put, `${apiUrl}/songs/${action.payload.id}`, { title: action.payload.title });
    yield put({ type: 'songs/updateSongSuccess', payload: response.data });
  } catch (error) {
    yield put({ type: 'songs/updateSongFailure', payload: error.message });
  }
}

function* deleteSongSaga(action) {
  try {
    yield call(axios.delete, `${apiUrl}/songs/${action.payload}`);
    yield put({ type: 'songs/deleteSongSuccess', payload: action.payload });
  } catch (error) {
    yield put({ type: 'songs/deleteSongFailure', payload: error.message });
  }
}

export function* songsSaga() {
  yield takeLatest(FETCH_SONGS, fetchSongsSaga);
  yield takeLatest(ADD_SONG, addSongSaga);
  yield takeLatest(UPDATE_SONG, updateSongSaga);
  yield takeLatest(DELETE_SONG, deleteSongSaga);
}

// Reducer
const initialState = [];
const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsSuccess(state, action) {
      return action.payload;
    },
    addSongSuccess(state, action) {
      state.push(action.payload);
    },
    updateSongSuccess(state, action) {
      const { id, title } = action.payload;
      const song = state.find((song) => song.id === id);
      if (song) {
        song.title = title;
      }
    },
    deleteSongSuccess(state, action) {
      const id = action.payload;
      return state.filter((song) => song.id !== id);
    },
  },
});

export const { fetchSongsSuccess, addSongSuccess, updateSongSuccess, deleteSongSuccess } = songsSlice.actions;
export default songsSlice.reducer;