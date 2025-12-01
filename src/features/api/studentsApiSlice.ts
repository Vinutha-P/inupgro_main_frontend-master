import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/features/api/axios';
import {
  EditProfileRequest,
  EditProfileResponse,
  RemoveSchoolRequest,
  RemoveSchoolResponse,
  EditSchoolRequest,
  EditSchoolResponse,
  RemoveMarksheetRequest,
  RemoveMarksheetResponse,
  AddMarksheetRequest,
  AddMarksheetResponse,
  StudentRegisterRequest,
  StudentRegisterResponse,
} from '@/types';
import { updateUserProfile } from '@/features/auth/authSlice';

export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Student', 'StudentProfile'],
  endpoints: (builder) => ({
    registerStudent: builder.mutation<StudentRegisterResponse, StudentRegisterRequest>({
      query: (data: any) => ({
        url: '/v1/students/',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),
    getStudentProfile: builder.query<any, void>({
      query: () => ({
        url: '/v1/students/profile',
        method: 'GET',
      }),
      providesTags: ['StudentProfile'],
      transformResponse: (response: { success: boolean; message: string; results: any }) => {
        if (!response.success) throw new Error(response.message || 'Failed to fetch profile');
        return response.results;
      },
      transformErrorResponse: (response: any) => ({
        message: response?.data?.message || 'Error fetching profile',
        status: response?.status || 500,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUserProfile(data));
        } catch (error) {
          console.error('Failed to update user profile from getStudentProfile:', error);
        }
      },
    }),
    editStudentProfile: builder.mutation<EditProfileResponse, EditProfileRequest>({
      query: (data: any) => ({
        url: '/v1/students/edit-profile',
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['StudentProfile'],
      transformResponse: (response: { success: boolean; message: string; results: EditProfileResponse }) => {
        if (!response.success) throw new Error(response.message || 'Failed to edit profile');
        return response.results;
      },
      transformErrorResponse: (response: any) => ({
        message: response?.data?.message || 'Error editing profile',
        status: response?.status || 500,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // dispatch(updateUserProfile(data));
        } catch (error) {
          console.error('Failed to update user profile from editStudentProfile:', error);
        }
      },
    }),
    removeStudentSchool: builder.mutation<RemoveSchoolResponse, RemoveSchoolRequest>({
      query: (id: any) => ({
        url: `/v1/students/remove-student-school/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['StudentProfile'],
      transformResponse: (response: { success: boolean; message: string; results: RemoveSchoolResponse }) => {
        if (!response.success) throw new Error(response.message || 'Failed to remove school');
        return response.results;
      },
      transformErrorResponse: (response: any) => ({
        message: response?.data?.message || 'Error removing school',
        status: response?.status || 500,
      }),
    }),
    editStudentSchool: builder.mutation<EditSchoolResponse, EditSchoolRequest>({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/v1/students/edit-student-school/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['StudentProfile'],
      transformResponse: (response: { success: boolean; message: string; results: EditSchoolResponse }) => {
        if (!response.success) throw new Error(response.message || 'Failed to edit school');
        return response.results;
      },
      transformErrorResponse: (response: any) => ({
        message: response?.data?.message || 'Error editing school',
        status: response?.status || 500,
      }),
    }),
    removeStudentMarksheet: builder.mutation<RemoveMarksheetResponse, RemoveMarksheetRequest>({
      query: (id: any) => ({
        url: `/v1/students/remove-student-marksheet/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['StudentProfile'],
      transformResponse: (response: { success: boolean; message: string; results: RemoveMarksheetResponse }) => {
        if (!response.success) throw new Error(response.message || 'Failed to remove marksheet');
        return response.results;
      },
      transformErrorResponse: (response: any) => ({
        message: response?.data?.message || 'Error removing marksheet',
        status: response?.status || 500,
      }),
    }),
    addStudentMarksheet: builder.mutation<AddMarksheetResponse, AddMarksheetRequest>({
      query: (data: any) => ({
        url: '/v1/students/add-student-marksheet',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['StudentProfile'],
      transformResponse: (response: { success: boolean; message: string; results: AddMarksheetResponse }) => {
        if (!response.success) throw new Error(response.message || 'Failed to add marksheet');
        return response.results;
      },
      transformErrorResponse: (response: any) => ({
        message: response?.data?.message || 'Error adding marksheet',
        status: response?.status || 500,
      }),
    }),
  }),
});

export const {
  useRegisterStudentMutation,
  useGetStudentProfileQuery,
  useEditStudentProfileMutation,
  useRemoveStudentSchoolMutation,
  useEditStudentSchoolMutation,
  useRemoveStudentMarksheetMutation,
  useAddStudentMarksheetMutation,
} = studentsApi;