import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axios'
import { HomepageQueryParams, HomepageResponse } from '@/types'

export const homepageApi = createApi({
  reducerPath: 'homepageApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Homepage'],
  endpoints: (builder) => ({
    getHomepageData: builder.query<HomepageResponse, HomepageQueryParams>({
      query: (params) => ({
        url: '/v1/homepage',
        method: 'GET',
        params: {
          search: params.search || undefined,
          location: params.location || undefined,
          sortBy: params.sortBy || undefined,
          limit: params.limit || 10,
          page: params.page || 1,
        },
      }),
      providesTags: ['Homepage'],
      transformResponse: (response: any): HomepageResponse => ({
        total_partners: {
          data: response.total_partners?.data || [],
          totalCount: response.total_partners?.totalCount || 0,
          totalPages: response.total_partners?.totalPages || 0,
          currentPage: response.total_partners?.currentPage || 0,
        },
        total_schools: response.total_schools || 0,
        total_colleges: response.total_colleges || 0,
        total_institute: response.total_institute || 0,
        total_teachers: response.total_teachers || 0,
        student_profiles: response.student_profiles || [],
        teacher_profiles: response.teacher_profiles || [],
        school_profiles: response.school_profiles || [],
        totalPages: response.totalPages || 1,
        currentPage: response.currentPage || 1,
      }),
      transformErrorResponse: (response: any) => {
        return {
          status: response.status,
          message: response.data?.message || 'Failed to fetch homepage data',
        }
      },
      serializeQueryArgs: ({ queryArgs }) => {
        // Unique cache key based on search and location, ignoring page
        return `homepage-${queryArgs.search || ''}-${queryArgs.location || ''}`
      },
      merge: (currentCache, newItems, { arg }) => {
        // If it's the first page or no current cache, return new items
        if (!currentCache || arg?.page === 1) {
          return newItems
        }

        // Merge the data arrays and keep the latest metadata
        return {
          ...newItems,
          school_profiles: [...currentCache.school_profiles, ...newItems.school_profiles],
          total_partners: {
            ...newItems.total_partners,
            data: [...currentCache.total_partners.data, ...newItems.total_partners.data],
          },
          student_profiles: [...currentCache.student_profiles, ...newItems.student_profiles],
          teacher_profiles: [...currentCache.teacher_profiles, ...newItems.teacher_profiles],
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.search !== previousArg?.search ||
          currentArg?.location !== previousArg?.location
        )
      },
    }),
  }),
})

export const { useGetHomepageDataQuery } = homepageApi