import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';
import type { Job } from '@/types';

interface JobsResponse {
  data: Job[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Jobs'],
  endpoints: (builder) => ({
    getAllJobs: builder.query<JobsResponse, void>({
      query: () => ({
        url: '/v1/jobs',
        method: 'GET',
      }),
      providesTags: ['Jobs'],
      transformResponse: (response: any) => ({
        data: response.data || [],
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0,
        currentPage: response.currentPage || 0,
      }),
      transformErrorResponse: (response: any) => {
        return response.data?.message || 'Failed to fetch jobs';
      },
    }),
    createJob: builder.mutation<Job, Partial<Job>>({
      query: (newJob) => ({
        url: '/v1/jobs',
        method: 'POST',
        data: newJob,
      }),
      invalidatesTags: ['Jobs'],
      transformErrorResponse: (response: any) => {
        return response.data?.message || 'Failed to create job';
      },
    }),
    getJobsByLocation: builder.query<JobsResponse, string>({
      query: (location) => ({
        url: `/v1/jobs/location/${encodeURIComponent(location)}`,
        method: 'GET',
      }),
      providesTags: ['Jobs'],
      transformResponse: (response: any) => ({
        data: response.data || [],
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0,
        currentPage: response.currentPage || 0,
      }),
      transformErrorResponse: (response: any) => {
        return response.data?.message || 'Failed to fetch jobs by location';
      },
    }),
    getJobsBySubject: builder.query<JobsResponse, string>({
      query: (subject) => ({
        url: `/v1/jobs/subject/${encodeURIComponent(subject)}`,
        method: 'GET',
      }),
      providesTags: ['Jobs'],
      transformResponse: (response: any) => ({
        data: response.data || [],
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0,
        currentPage: response.currentPage || 0,
      }),
      transformErrorResponse: (response: any) => {
        return response.data?.message || 'Failed to fetch jobs by subject';
      },
    }),
    getJobsByMedium: builder.query<JobsResponse, string>({
      query: (medium) => ({
        url: `/v1/jobs/medium/${encodeURIComponent(medium)}`,
        method: 'GET',
      }),
      providesTags: ['Jobs'],
      transformResponse: (response: any) => ({
        data: response.data || [],
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0,
        currentPage: response.currentPage || 0,
      }),
      transformErrorResponse: (response: any) => {
        return response.data?.message || 'Failed to fetch jobs by medium';
      },
    }),
    getJobsByExperienceLevel: builder.query<JobsResponse, string>({
      query: (experienceLevel) => ({
        url: `/v1/jobs/experience-level/${encodeURIComponent(experienceLevel)}`,
        method: 'GET',
      }),
      providesTags: ['Jobs'],
      transformResponse: (response: any) => ({
        data: response.data || [],
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0,
        currentPage: response.currentPage || 0,
      }),
      transformErrorResponse: (response: any) => {
        return response.data?.message || 'Failed to fetch jobs by experience level';
      },
    }),
    getJobsByInstitute: builder.query<JobsResponse, string>({
      query: (instituteId) => ({
        url: `/v1/jobs/institute/${encodeURIComponent(instituteId)}`,
        method: 'GET',
      }),
      providesTags: ['Jobs'],
      transformResponse: (response: any) => ({
        data: response.data || [],
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0,
        currentPage: response.currentPage || 0,
      }),
      transformErrorResponse: (response: any) => {
        return response.data?.message || 'Failed to fetch jobs by institute';
      },
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useCreateJobMutation,
  useGetJobsByLocationQuery,
  useGetJobsBySubjectQuery,
  useGetJobsByMediumQuery,
  useGetJobsByExperienceLevelQuery,
  useGetJobsByInstituteQuery,
} = jobsApi;