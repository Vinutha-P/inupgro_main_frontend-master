import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';

export const couponApi = createApi({
    reducerPath: 'couponApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Coupons'],
    endpoints: (builder) => ({
        getAllCoupon: builder.query<any[], void>({   
            query: () => ({
                url: "/v1/coupons/coupons-list",
                method: "GET",
            }),
            transformResponse: (response: any) => response.results || [],
        }),
        createCoupon: builder.mutation({
            query: (newCoupon) => ({
                url: "/v1/coupons/create",
                method: "POST",
                data: newCoupon,
            }),
            invalidatesTags: ["Coupons"],
        }),
    }),
});

export const {
    useGetAllCouponQuery,
    useCreateCouponMutation
} = couponApi;
