import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songsReducer, { songsSaga } from './songsSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songsReducer,
    // Add other reducers here if needed
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable values in state
    });
    return middleware.concat(sagaMiddleware);
  },
});

sagaMiddleware.run(songsSaga);

export default store;