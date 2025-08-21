

import { configureStore } from "@reduxjs/toolkit";
import authReducer, { hydrateUser } from "@/features/authSlice";
import authApi from '../features/api/authapi';  // your RTK Query api
import courseApi from '../features/api/courseapi'
import purchaseApi from '../features/api/purchaseapi'
export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware),
});

const initializeUser = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return { user: null, isAuthenticated: false };

  try {
    const parsedUser = JSON.parse(storedUser);
    const isValidUser = parsedUser && Object.keys(parsedUser).length > 0;
    return {
      user: isValidUser ? parsedUser : null,
      isAuthenticated: isValidUser,
    };
  } catch (err) {
    console.error("Failed to parse stored user:", err);
    return { user: null, isAuthenticated: false };
  }
};

const initialUserState = initializeUser();
appStore.dispatch(hydrateUser(initialUserState));
