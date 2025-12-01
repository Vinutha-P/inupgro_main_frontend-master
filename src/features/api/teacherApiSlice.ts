import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';
import { TeacherRegisterRequest, TeacherRegisterResponse } from '../../types';
import { EditEducationRequest, EditExperienceRequest, TeacherProfile } from '../../types/teacher.types';
import { updateUserProfile } from '@/features/auth/authSlice';

export const teacherApi = createApi({
  reducerPath: 'teacherApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Teacher', 'TeacherProfile'],
  endpoints: (builder) => ({
    registerTeacher: builder.mutation<TeacherRegisterResponse, TeacherRegisterRequest>({
      query: (data) => ({
        url: '/v1/teachers/',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'Teacher', id: 'LIST' }],
    }),
    getTeacherProfile: builder.query<TeacherProfile, void>({
      query: () => ({
        url: '/v1/teachers/profile',
        method: 'GET',
      }),
      providesTags: ['TeacherProfile'],
      transformResponse: (response: { success: boolean; message: string; results: any }) => {
        if (!response.success) throw new Error(response.message || 'Failed to fetch teacher profile');
        return response.results;
      },
      transformErrorResponse: (response: any) => ({
        message: response?.data?.message || 'Error fetching teacher profile',
        status: response?.status || 500,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUserProfile(data));
        } catch (error) {
          console.error('Failed to update user profile from getTeacherProfile:', error);
        }
      },
    }),
    updateTeacherProfile: builder.mutation<TeacherProfile, Partial<TeacherProfile>>({
      query: (data) => ({
        url: '/v1/teachers/edit-profile',
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['TeacherProfile'],
      transformResponse: (response: { success: boolean; message: string; results: TeacherProfile }) => {
        if (!response.success) throw new Error(response.message || 'Failed to update teacher profile');
        return response.results;
      },
      transformErrorResponse: (response: any) => ({
        message: response?.data?.message || 'Error updating teacher profile',
        status: response?.status || 500,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // dispatch(updateUserProfile(data));
        } catch (error) {
          console.error('Failed to update user profile from updateTeacherProfile:', error);
        }
      },
    }),
    editEducation: builder.mutation<void, { id: string; data: EditEducationRequest }>({
      query: ({ id, data }) => ({
        url: `/v1/teachers/edit-education/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['TeacherProfile'],
    }),
    removeEducation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/teachers/remove-education/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TeacherProfile'],
    }),
    editExperience: builder.mutation<void, { id: string; data: EditExperienceRequest }>({
      query: ({ id, data }) => ({
        url: `/v1/teachers/edit-experience/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['TeacherProfile'],
    }),
    removeExperience: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/teachers/remove-experience/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TeacherProfile'],
    }),
  }),
});

export const {
  useRegisterTeacherMutation,
  useGetTeacherProfileQuery,
  useUpdateTeacherProfileMutation,
  useEditEducationMutation,
  useRemoveEducationMutation,
  useEditExperienceMutation,
  useRemoveExperienceMutation,
} = teacherApi;