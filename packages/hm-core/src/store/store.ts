import { configureStore } from '@reduxjs/toolkit';
import errorSlice from './slices/errorSlice';

export const store = configureStore({
  reducer: {
    error: errorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
