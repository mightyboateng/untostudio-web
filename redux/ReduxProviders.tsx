"use client";

import React from "react";
import { Provider } from "react-redux";
import { store, persister } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

export function ReduxProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        {children}
      </PersistGate>
    </Provider>
  );
}
