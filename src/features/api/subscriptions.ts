import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';

export const subscriptionApi = createApi({
    reducerPath: 'subscriptionApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Subscription'],
    endpoints: (builder) => ({
        getAllPlans: builder.query<any[], void>({   
            query: () => ({
                url: "/v1/subscription/get-plans",
                method: "GET",
            }),
            transformResponse: (response: any) => response.results || [],
        }),
        createPlan: builder.mutation({
            query: (newPlan) => ({
                url: "/v1/subscription/create-plan",
                method: "POST",
                data: newPlan,
            }),
            invalidatesTags: ["Subscription"],
        }),
        createSubscription: builder.mutation({
            query: (newPlan) => ({
                url: "/v1/subscription/create",
                method: "POST",
                data: newPlan,
            }),
            invalidatesTags: ["Subscription"],
        }),
    }),
});

export const {
    useGetAllPlansQuery,
    useCreatePlanMutation,
    useCreateSubscriptionMutation,
} = subscriptionApi;
