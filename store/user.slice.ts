import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, { payload }: { payload: User }) {
      state.user = payload;
    },
    logout(state) {
      state.user = null;
    }
  }
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;