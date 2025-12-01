import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axios';

export const s3Api = createApi({
    reducerPath: 's3Api',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getPresignedUrl: builder.mutation<string, { bucketName: string; key: string }>({
            query: ({ bucketName, key }) => ({
                url: '/v1/s3',
                method: 'GET',
                params: { bucketName, key },
            }),
            transformResponse: (response: { url: string }) => response.url,
        }),
    }),
});


export const { useGetPresignedUrlMutation } = s3Api