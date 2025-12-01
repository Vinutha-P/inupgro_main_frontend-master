import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';

type StatusChangePayload = {
    id: string;
    type: string; // add others if needed
};

export const commonApi = createApi({
    reducerPath: 'commonApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Common'],
    endpoints: (builder) => ({
        changeStatusToActive: builder.mutation<void, StatusChangePayload>({
            query: ({ id, type }) => ({
                url: `/v1/common/status-change-to-active/${id}`,
                method: 'PUT',
                data: { type },
            }),
            invalidatesTags: ['Common'],
        }),
    }),
});

export const {
    useChangeStatusToActiveMutation,
} = commonApi;
