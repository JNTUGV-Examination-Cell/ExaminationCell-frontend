import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "../features/roles/roleSlice";
import examReducer from "../features/exams/examSlice";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const examPersistConfig = {
  key: 'exam',
  storage,
};

const persistedExamReducer = persistReducer(examPersistConfig, examReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    currentExam: persistedExamReducer,
  },
});