import { createSlice } from "@reduxjs/toolkit";
export const UserSlice = createSlice({
  name: "userData",
  initialState: {
    userData: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
