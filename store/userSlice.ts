import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

const initialState: userState = {
  name: "",
  email: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ name: string; email: string }>) {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
      state.isLoggedIn = true;
      return state;
    },
    logout(state) {
      state.isLoggedIn = false;
      return state;
    },
  },
});

export const userActions = { ...userSlice.actions };

export default userSlice.reducer;
