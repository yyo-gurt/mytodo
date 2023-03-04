import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  rendering: boolean;
}

const initialState: AuthState = {
  rendering: true,
};

export const authSlice = createSlice({
  name: "rendering",
  initialState,
  reducers: {
    startRendering(state) {
      state.rendering = true;
    },
    finishRendering(state) {
      state.rendering = false;
    },
  },
});

export const { startRendering, finishRendering } = authSlice.actions;

export default authSlice.reducer;
