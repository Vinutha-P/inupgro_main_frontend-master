import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios";
import { JobApplicationRequest } from "@/types";

export const jobApplicationApi = createApi({
  reducerPath: "jobApplicationApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    applyForJob: builder.mutation<void, { objectId: string; applicationData: JobApplicationRequest }>({
      query: ({ objectId, applicationData }) => ({
        url: `/v1/applications/jobs/${objectId}`,
        method: "POST",
        data: applicationData,
      }),
    }),
  }),
});

export const { useApplyForJobMutation } = jobApplicationApi;