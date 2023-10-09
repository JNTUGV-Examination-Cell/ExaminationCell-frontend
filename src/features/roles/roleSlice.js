import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRole: "admin",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
  },
});

export const { setUserRole } = userSlice.actions;

export const selectUserRole = (state) => state.user.userRole;

export default userSlice.reducer;
