import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userSliceReducer from "./slides/userSlice";
import localSliceReducer from "./slides/localState";

const createNoopStorage = () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getItem(_: unknown) {
      return Promise.resolve(null);
    },
    setItem(_key: unknown, value: unknown) {
      return Promise.resolve(value);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeItem(_: unknown) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

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
    localState: localSliceReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persister = persistStore(store);
