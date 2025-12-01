import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const schoolsApi = createApi({
  reducerPath: "schoolsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["School"],
  endpoints: (builder) => ({
    getAllSchools: builder.query({
      query: ({ page = 1, limit = 10, sortBy = "name:asc" } = {}) => ({
        url: "/v1/schools",
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
        // If it's the first page or no current cache, return new items
        if (!currentCache || arg?.page === 1) {
          return newItems;
        }

        // Merge the data arrays and keep the latest metadata
        return {
          data: [...currentCache.data, ...newItems.data],
          totalPages: newItems.totalPages,
          currentPage: newItems.currentPage,
          totalCount: newItems.totalCount,
        };
      },

      // Only force refetch if the page number changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },

      // Provide tags for cache invalidation
      providesTags: (result) =>
        result
          ? [
              ...result.data?.map(({ id }) => ({ type: "School", id })),
              { type: "School", id: "LIST" },
            ]
          : [{ type: "School", id: "LIST" }],
    }),
    createSchool: builder.mutation({
      query: (newSchool) => ({
        url: "/v1/schools",
        method: "POST",
        data: newSchool,
      }),
      invalidatesTags: [{ type: "School", id: "LIST" }],
    }),
    getSchoolById: builder.query({
      query: (id) => ({
        url: `/v1/schools/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "School", id }],
    }),

    verifySchool: builder.mutation({
      query: (id) => ({
        url: `/v1/schools/verify/${id}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "School", id }],
    }),

    searchSchools: builder.query({
      query: (query) => ({
        url: "/v1/schools/search",
        method: "GET",
        params: query,
      }),
      providesTags: (result) => {
        if (result && Array.isArray(result.data)) {
          return result.data?.map(({ id }) => ({ type: "School", id }));
        }
        return [];
      },
    }),

    searchNearbySchools: builder.query({
      query: ({
        latitude = 0,
        longitude = 0,
        radiusInKm = 15000,
        sortBy = "name:asc",
        limit = 10,
        page = 1,
      } = {}) => ({
        url: "/v1/schools/nearby",
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
      providesTags: (result) => {
        if (result && Array.isArray(result.data)) {
          return result.data?.map(({ id }) => ({ type: "School", id }));
        }
        return [];
      },
    }),
    uploadSchoolLogo: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "https://s3/inpugro/logo/",
          method: "PUT",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: [{ type: "School", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllSchoolsQuery,
  useCreateSchoolMutation,
  useGetSchoolByIdQuery,
  useVerifySchoolMutation,
  useSearchSchoolsQuery,
  useSearchNearbySchoolsQuery,
  useLazyGetAllSchoolsQuery,
  useUploadSchoolLogoMutation,
} = schoolsApi;
