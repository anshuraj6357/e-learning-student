import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedin, userLoggedout } from '@/features/authSlice';

const USER_API = "http://localhost:3000/api/v1/user/";

// const USER_API = import.meta.env.VITE_REACT_APP_AUTHAPI;

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: 'include', // send cookies
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (formdata) => ({
        url: "register",
        method: "POST",
        body: formdata,
      }),
    }),
    loginUser: builder.mutation({
      query: (formdata) => ({
        url: "login",
        method: "POST",
        body: formdata,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const userData = {
            user: result.data.existingUser,
            isAuthenticated: true,
          };
          localStorage.setItem("user", JSON.stringify(result.data.existingUser));
          dispatch(userLoggedin(userData)); 
        } catch (error) {
          console.log("login error:", error);
        }
      }
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("user");
          localStorage.removeItem("token"); // If you store token separately

          dispatch(userLoggedout());
        } catch (error) {
          console.log("logout error:", error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          console.log("hii")
          const result = await queryFulfilled;
          const userData = {
            user: result.data.existingUser,
            isAuthenticated: true,
          };
          dispatch(userLoggedin(userData));
          localStorage.setItem("user", JSON.stringify(result.data.profile));
        } catch (error) {
          dispatch(userLoggedin({ user: null, isAuthenticated: false }));
        }
      }
    }),
    updateUser: builder.mutation({
      query: (formdata) => ({
        url: "profile/update",
        method: "PUT",
        body: formdata,
      }), async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem("user", JSON.stringify(result.data.user));
        } catch (error) {
          console.log("login error:", error);
        }
      }
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLogoutUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation
} = authApi;

export default authApi;
