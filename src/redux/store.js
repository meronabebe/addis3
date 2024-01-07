
import { configureStore } from '@reduxjs/toolkit';
import songsReducer from './songsSlice';

const store = configureStore({
  reducer: {
    songs: songsReducer,
    // Add other reducers here if needed
  },
});

export default store;