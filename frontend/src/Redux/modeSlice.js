import { createSlice } from "@reduxjs/toolkit";
export const modeSlice = createSlice({
  name: "mode",
  initialState: {
    mode: "light",
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});
export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
