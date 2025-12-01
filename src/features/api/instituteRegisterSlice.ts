import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axios'
import { InstituteRegisterRequest, TeacherRegisterResponse } from '@/types'

export const instituteRegisterApi = createApi({
    reducerPath: 'instituteRegisterApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Institute'],
    endpoints: (builder) => ({
      registerInstitute: builder.mutation<TeacherRegisterResponse, InstituteRegisterRequest>({
        query: (data) => ({
          url: '/v1/academic-institutes/',
          method: 'POST',
          data,
        }),
        invalidatesTags: [{ type: 'Institute', id: 'LIST' }],
      }),
    }),
  })
  
  export const {
    useRegisterInstituteMutation
  } = instituteRegisterApi