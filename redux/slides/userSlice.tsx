import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUserDetail: (state, action) => {
      state.user = action.payload;
    },

  },
});

export const { setUserDetail } = userSlice.actions;

export default userSlice.reducer;
