import { ReactNode } from 'react';
import { createSlice } from '@reduxjs/toolkit';

export interface ErrorState {
  loading: boolean;
}

const initialState: ErrorState = {
  loading: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading } = uiSlice.actions;

export default uiSlice.reducer;
