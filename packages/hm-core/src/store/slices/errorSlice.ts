import { createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

export interface ErrorState {
  type: string;
  title?: string;
  message: string;
  icon?: ReactNode;
}

const initialState: ErrorState = {
  type: '',
  title: '',
  message: '',
  icon: null,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.title = action.payload.title;
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.icon = action.payload.icon;
    },
    dismissError: state => {
      state.type = initialState.type;
      state.message = initialState.message;
      state.title = initialState.title;
      state.icon = initialState.icon;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setError, dismissError } = errorSlice.actions;

export default errorSlice.reducer;
