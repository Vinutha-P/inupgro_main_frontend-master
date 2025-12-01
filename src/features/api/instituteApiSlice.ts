import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios";

// Interface definitions
interface Coaching {
  id: string;
  name: string;

}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

interface GetAllCoachingsParams {
  sortBy?: string;
  limit?: number;
  page?: number;
}

export const coachingsApi = createApi({
  reducerPath: "coachingsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Coaching'],
  endpoints: (builder: any) => ({
    getAllCoachings: builder.query({
      query: ({
        sortBy = "name:asc",
        limit = 10,
        page = 1,
      }) => ({
        url: "/v1/coachings",
        method: "GET",
        params: {
          sortBy,
          limit,
          page,
        },
      }),
      serializeQueryArgs: ({ endpointName }: any) => {
        return endpointName;
      },
      merge: (currentCache:any, newItems:any, { arg }: any) => {
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
      forceRefetch({ currentArg, previousArg }: any) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: (result: any) =>
        result
          ? [
            ...result.data.map(({ id }: any) => ({ type: 'Coaching' as const, id })),
            { type: 'Coaching' as const, id: 'LIST' },
          ]
          : [{ type: 'Coaching' as const, id: 'LIST' }],
    }),

    // POST - Create a new coaching
    createCoaching: builder.mutation({
      query: (newCoaching: any) => ({
        url: "/v1/coachings",
        method: "POST",
        data: newCoaching,
      }),
      invalidatesTags: [{ type: "Coaching" as const, id: "LIST" }],
    }),

    // GET - Fetch a coaching by ID
    getCoachingById: builder.query({
      query: (id: any) => ({
        url: `/v1/coachings/${id}`,
        method: "GET",
      }),
      providesTags: (id: any) => [{ type: "Coaching" as const, id }],
    }),

    // POST - Verify a coaching
    verifyCoaching: builder.mutation({
      query: (id: any) => ({
        url: `/v1/coachings/verify/${id}`,
        method: "POST",
      }),
      invalidatesTags: (id: any) => [{ type: "Coaching" as const, id }],
    }),

    // GET - Search coachings
    searchCoachings: builder.query({
      query: (query: any) => ({
        url: "/v1/coachings/search",
        method: "GET",
        params: query,
      }),
      providesTags: (result: any): Array<{ type: "Coaching"; id: string }> =>
        result
          ? result.data.map(() => ({ type: "Coaching" as const }))
          : [],
    }),

    // GET - Search nearby coachings
    searchNearbyCoachings: builder.query({
      query: ({
        latitude,
        longitude,
        radiusInKm = 10,
        sortBy = "name:asc",
        limit = 10,
        page = 1,
      }: any) => ({
        url: "/v1/coachings/nearby",
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
      providesTags: (result: any): Array<{ type: "Coaching"; id: string }> =>
        result
          ? result.data.map(() => ({ type: "Coaching" as const }))
          : [],
    }),
  }),
});

export const {
  useGetAllCoachingsQuery,
  useCreateCoachingMutation,
  useGetCoachingByIdQuery,
  useVerifyCoachingMutation,
  useSearchCoachingsQuery,
  useSearchNearbyCoachingsQuery,
  useLazyGetAllCoachingsQuery,
} = coachingsApi;