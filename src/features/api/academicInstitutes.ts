import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';
import { updateUserProfile } from '@/features/auth/authSlice';

export interface InstituteProfile {
  _id: string;
  name: string;
  email: string;
  instituteType: string;
  address: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export const instituteApi = createApi({
  reducerPath: 'instituteApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['InstituteProfile'],
  endpoints: (builder) => ({
    getInstituteProfile: builder.query<InstituteProfile, void>({
      query: () => ({
        url: '/v1/academic-institutes/profile',
        method: 'GET',
      }),
      providesTags: ['InstituteProfile'],
      transformResponse: (response: { success: boolean; message: string; results: any }) => {
        if (!response.success) throw new Error(response.message || 'Failed to fetch institute profile');
        return response.results;
      },
      transformErrorResponse: (response: any) => ({
        message: response?.data?.message || 'Error fetching institute profile',
        status: response?.status || 500,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUserProfile(data));
        } catch (error) {
          console.error('Failed to update user profile from getInstituteProfile:', error);
        }
      },
    }),
    updateInstituteProfile: builder.mutation<InstituteProfile, Partial<InstituteProfile>>({
      query: (data) => ({
        url: '/v1/academic-institutes/edit-profile',
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['InstituteProfile'],
      transformResponse: (response: { success: boolean; message: string; results: InstituteProfile }) => {
        if (!response.success) throw new Error(response.message || 'Failed to update profile');
        return response.results;
      },
      transformErrorResponse: (response: any) => ({
        message: response?.data?.message || 'Error updating profile',
        status: response?.status || 500,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        //   dispatch(updateUserProfile(data));
        } catch (error) {
          console.error('Failed to update user profile from updateInstituteProfile:', error);
        }
      },
    }),
  }),
});

export const {
  useGetInstituteProfileQuery,
  useUpdateInstituteProfileMutation,
} = instituteApi;