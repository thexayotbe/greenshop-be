import { createSlice } from "@reduxjs/toolkit";

const modalaSlice = createSlice({
  name: "modalSlice",
  initialState: {
    authModalVisibility: false,
    orderModalVisibility: false,
    emailVerificationModalVisibility: false,
  },
  reducers: {
    switchAuthModalVisibility(state) {
      state.authModalVisibility = !state.authModalVisibility;
    },
    switchOrderModalVisibility(state) {
      state.orderModalVisibility = !state.orderModalVisibility;
    },
    switchEmailVerificationModalVisibility(state) {
      state.emailVerificationModalVisibility =
        !state.emailVerificationModalVisibility;
    },
  },
});

export const {
  switchAuthModalVisibility,
  switchOrderModalVisibility,
  switchEmailVerificationModalVisibility,
} = modalaSlice.actions;
export default modalaSlice.reducer;
