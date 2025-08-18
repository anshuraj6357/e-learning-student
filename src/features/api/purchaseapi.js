import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const USER_API = "http://localhost:3000/api/v1/coursepurchase";

const purchaseApi = createApi({
    reducerPath: "purchaseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include', // send cookies
    }),
    endpoints: (builder) => ({
        CreateCheckOutSession: builder.mutation({
            query: (courseId) => ({
                url: 'checkout/create-checkout-session', // remove leading '/'
                method: 'POST',
                body: { courseId } // send as object
            })
        }),
        Getallpurchasedcourse:builder.query({
            query:()=>({
                url:'getallpurchasedcourse',
            })
        }),
        Checkcoursestatus:builder.query({
            query:(courseId)=>({
                url:`purchasedcoursedetail/${courseId}`,
            }),
    })
})
})

export const {
    useCreateCheckOutSessionMutation,
    useGetallpurchasedcourseQuery,
    useCheckcoursestatusQuery
} = purchaseApi;

export default purchaseApi;
