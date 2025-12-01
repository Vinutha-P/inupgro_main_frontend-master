import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Dashboard'],
    endpoints: (builder) => ({
        getAllDetails: builder.query<any, void>({   
            query: () => ({
                url: `/v1/academic-institutes/dashboard?keyword=null&newAdmissionYearFilter=null&newAdmissionFrequencyFilter=null&trendingNewsFilter=null&userTypeFilter=null`,
                method: "GET",
            }),
            transformResponse: (response: any) => response.results || [],
        })
    }),
});

export const {
    useGetAllDetailsQuery
} = dashboardApi;