// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     userLoggedin: (state, action) => {
//       state.user = action.payload.user;
//       state.isAuthenticated = true;
//     },
//     userLoggedout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { userLoggedin, userLoggedout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   userLoggedin: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      // localStorage.setItem("user", JSON.stringify(action.payload.user)); // Save to localStorage
    },
    userLoggedout : (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // localStorage.removeItem("user"); // Remove from localStorage
    },
    hydrateUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { userLoggedin, userLoggedout , hydrateUser } = authSlice.actions;
export default authSlice.reducer;
