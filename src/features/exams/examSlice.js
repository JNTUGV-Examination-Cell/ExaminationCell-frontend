import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentExam: "R20",
  currentExamName: "ABC"
};

export const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setExam: (state, action) => {
      state.currentExam = action.payload;
    },
    setExamName: (state, action) => {
        state.currentExamName = action.payload;
    }
  },
});

export const { setExam, setExamName } = examSlice.actions;

export const selectCurrentExam = (state) => state.currentExam;
export const selectCurrentExamName = (state) => state.currentExamName;

export default examSlice.reducer;
