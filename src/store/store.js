

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
    getDefaultMiddleware().concat(authApi.middleware, courseApi.middleware,purchaseApi.middleware),
});


const storedUser = localStorage.getItem("user");

if (storedUser) {
  try {
    const parsedUser = JSON.parse(storedUser);
    console.log("parseduser", parsedUser)
    appStore.dispatch(
      hydrateUser({
        user: parsedUser,
        isAuthenticated: true,
      })
    );
  } catch (err) {
    console.error("Failed to parse stored user:", err);
    appStore.dispatch(
      hydrateUser({
        user: null,
        isAuthenticated: false,
      })
    );
  }
} else {
  appStore.dispatch(
    hydrateUser({
      user: null,
      isAuthenticated: false,
    })
  );
}
