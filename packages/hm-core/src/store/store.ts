import { configureStore } from '@reduxjs/toolkit';
import errorSlice from './slices/errorSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    error: errorSlice,
    ui: uiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
