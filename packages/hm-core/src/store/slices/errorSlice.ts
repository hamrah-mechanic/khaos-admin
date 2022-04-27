import { createSlice } from '@reduxjs/toolkit';

export interface ErrorState {
  type: string;
  message: string;
}

const initialState: ErrorState = {
  type: '',
  message: '',
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    dismissError: state => {
      state.type = initialState.type;
      state.message = initialState.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setError, dismissError } = errorSlice.actions;

export default errorSlice.reducer;
