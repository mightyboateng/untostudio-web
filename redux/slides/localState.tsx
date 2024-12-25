import { createSlice } from "@reduxjs/toolkit";

export const localState = createSlice({
  name: "localState",
  initialState: {
    disableOtherLoginOptions: false,
  },
  reducers: {
    setDisableOtherLoginOptions: (state, action) => {
      state.disableOtherLoginOptions = action.payload;
    },
  },
});

export const { setDisableOtherLoginOptions } = localState.actions;

export default localState.reducer;