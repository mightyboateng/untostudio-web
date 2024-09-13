import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import userSliceReducer from './slides/userSlice'

const persistConfig = {
  key: "root",
  storage: storage,
  // whitelist: [],
  whitelist: ["user"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userSliceReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persister = persistStore(store);
