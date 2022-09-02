import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';
import {
  turnsReducer,
  gameStateReducer,
  movesReducer,
  nameReducer,
  checkedResultsReducer,
  treasuresFoundReducer,
  highScoreReducer,
} from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['moves'],
};

const rootReducer = combineReducers({
  name: nameReducer,
  moves: movesReducer,
  turns: turnsReducer,
  isGameStarted: gameStateReducer,
  checkedResults: checkedResultsReducer,
  treasuresFound: treasuresFoundReducer,
  highScores: highScoreReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
