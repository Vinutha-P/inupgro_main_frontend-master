import { createApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios";


export const collegesApi = createApi({
  reducerPath: "collegeApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ['College'],
  endpoints: (builder) => ({
    getAllColleges: builder.query({
      query: ({ page = 1, limit = 10, sortBy = "name:asc" }) => ({
        url: "/v1/colleges",
        method: "GET",
        params: { page, limit, sortBy },
      }),
      transformResponse: (response) => {
        return {
          data: response.data || [],
          totalPages: response.totalPages,
          currentPage: response.currentPage,
          totalCount: response.total || 0,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (!currentCache || arg?.page === 1) {
          return newItems;
        }
        return {
          data: [...currentCache.data, ...newItems.data],
          totalPages: newItems.totalPages,
          currentPage: newItems.currentPage,
          totalCount: newItems.totalCount,
        };
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },

      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ id }) => ({ type: 'College', id })),
            { type: 'College' , id: 'LIST' },
          ]
          : [{ type: 'College', id: 'LIST' }],
    }),
    createCollege: builder.mutation({
      query: (newCollege) => ({
        url: "/v1/colleges",
        method: "POST",
        data: newCollege,
      }),
      invalidatesTags: [{ type: "College", id: "LIST" }],
    }),

    getCollegeById: builder.query({
      query: (id) => ({
        url: `/v1/colleges/${id}`,
        method: "GET",
      }),
    }),

    verifyCollege: builder.mutation({
      query: (id) => ({
        url: `/v1/colleges/verify/${id}`,
        method: "POST",
      }),
      invalidatesTags: (id) => [{ type: "College", id }],
    }),

    searchColleges: builder.query({
      query: (query) => ({
        url: "/v1/colleges/search",
        method: "GET",
        params: query,
      }),
      providesTags: (result) =>
        result ? result.map((id) => ({ type: "College", id })) : [],
    }),

    searchNearbyColleges: builder.query({
      query: ({
        latitude,
        longitude,
        radiusInKm = 15000,
        sortBy = "name:asc",
        limit = 10,
        page = 1,
        
      } = {}) => ({
        url: "/v1/colleges/nearby",
        method: "GET",
        params: {
          latitude,
          longitude,
          radiusInKm,
          sortBy,
          limit,
          page,
        },
      }),
      
    }),
  }),
});

export const {
  useGetAllCollegesQuery,
  useCreateCollegeMutation,
  useGetCollegeByIdQuery,
  useVerifyCollegeMutation,
  useSearchCollegesQuery,
  useSearchNearbyCollegesQuery,
  useLazyGetAllCollegesQuery,
} = collegesApi;
