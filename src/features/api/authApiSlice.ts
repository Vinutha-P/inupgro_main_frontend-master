import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios";
import {
  RegisterData,
  AuthResponse,
  VerifyEmailResponse,
  VerifyEmailRequest,
  ResendOtpResponse,
  ResendOtpRequest,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  LogoutRequest,
} from "@/types";
import { logout, setCredentials } from "@/features/auth/authSlice";

export interface TransformedLoginResponse {
  token: string;
  refreshToken: string;
  user: any;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterData>({
      query: (data) => ({
        url: "/v1/auth/register",
        method: "POST",
        data,
      }),
    }),
    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (data) => ({
        url: "/v1/students/verify-email",
        method: "POST",
        data,
      }),
    }),
    resendOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
      query: (data) => ({
        url: "/v1/students/resend-otp",
        method: "POST",
        data,
      }),
    }),
    loginStudent: builder.mutation<TransformedLoginResponse, LoginRequest>({
      query: (data) => ({
        url: "/v1/students/login",
        method: "POST",
        data,
      }),
      transformResponse: (response: { success: boolean; message: string; results: any }): TransformedLoginResponse => {
        if (!response.success) {
          throw new Error(response.message || "Login failed");
        }
        const { results } = response;
        return {
          token: results.token,
          refreshToken: results.refreshToken,
          user: results,
        };
      },
      transformErrorResponse: (response: any) => {
        return {
          message: response?.data?.message || "An error occurred during login",
          status: response?.status || 500,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Fetch detailed profile data after login
          const profileResponse = await fetch('/api/v1/students/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });
          const profileData = await profileResponse.json();
          if (!profileData.success) {
            throw new Error(profileData.message || 'Failed to fetch profile');
          }
          const userProfile = profileData.results;
          dispatch(setCredentials({ token: data.token, refreshToken: data.refreshToken, user: userProfile }));
        } catch (error) {
          console.error('Failed to fetch and store student profile after login:', error);
        }
      },
    }),
    verifyEmailTeacher: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (data) => ({
        url: '/v1/teachers/verify-email',
        method: 'POST',
        data,
      }),
    }),
    resendOtpTeacher: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
      query: (data) => ({
        url: '/v1/teachers/resend-otp',
        method: 'POST',
        data,
      }),
    }),
    loginTeacher: builder.mutation<TransformedLoginResponse, LoginRequest>({
      query: (data) => ({
        url: '/v1/teachers/login',
        method: 'POST',
        data,
      }),
      transformResponse: (response: { success: boolean; message: string; results: any }): TransformedLoginResponse => {
        if (!response.success) {
          throw new Error(response.message || "Login failed");
        }
        const { results } = response;
        return {
          token: results.token,
          refreshToken: results.refreshToken,
          user: results,
        };
      },
      transformErrorResponse: (response: any) => {
        return {
          message: response?.data?.message || "An error occurred during login",
          status: response?.status || 500,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const profileResponse = await fetch('/api/v1/teachers/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });
          const profileData = await profileResponse.json();
          if (!profileData.success) {
            throw new Error(profileData.message || 'Failed to fetch profile');
          }
          const userProfile = profileData.results;
          dispatch(setCredentials({ token: data.token, refreshToken: data.refreshToken, user: userProfile }));
        } catch (error) {
          console.error('Failed to fetch and store teacher profile after login:', error);
        }
      },
    }),
    verifyEmailInstitute: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (data) => ({
        url: '/v1/academic-institutes/verify-email',
        method: 'POST',
        data,
      }),
    }),
    resendOtpInstitute: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
      query: (data) => ({
        url: '/v1/academic-institutes/resend-otp',
        method: 'POST',
        data,
      }),
    }),
    loginInstitute: builder.mutation<TransformedLoginResponse, LoginRequest>({
      query: (data) => ({
        url: '/v1/academic-institutes/login',
        method: 'POST',
        data,
      }),
      transformResponse: (response: { success: boolean; message: string; results: any }): TransformedLoginResponse => {
        if (!response.success) {
          throw new Error(response.message || "Login failed");
        }
        const { results } = response;
        return {
          token: results.token,
          refreshToken: results.refreshToken,
          user: results,
        };
      },
      transformErrorResponse: (response: any) => {
        return {
          message: response?.data?.message || "An error occurred during login",
          status: response?.status || 500,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const profileResponse = await fetch('/api/v1/academic-institutes/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });
          const profileData = await profileResponse.json();
          if (!profileData.success) {
            throw new Error(profileData.message || 'Failed to fetch profile');
          }
          const userProfile = profileData.results;
          dispatch(setCredentials({ token: data.token, refreshToken: data.refreshToken, user: userProfile }));
        } catch (error) {
          console.error('Failed to fetch and store institute profile after login:', error);
        }
      },
    }),

    login: builder.mutation<TransformedLoginResponse, LoginRequest>({
      query: (data) => ({
        url: '/v1/common/login',
        method: 'POST',
        data,
      }),
      transformResponse: (response: { success: boolean; message: string; results: any }): TransformedLoginResponse => {
        if (!response.success) {
          throw new Error(response.message || "Login failed");
        }
        const { results } = response;
        return {
          token: results.token,
          refreshToken: results.refreshToken,
          user: results,
        };
      },
      transformErrorResponse: (response: any) => {
        return {
          message: response?.data?.message || "An error occurred during login",
          status: response?.status || 500,
        };
      },
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     const profileResponse = await fetch('/api/v1/academic-institutes/profile', {
      //       method: 'GET',
      //       headers: {
      //         Authorization: `Bearer ${data.token}`,
      //       },
      //     });
      //     const profileData = await profileResponse.json();
      //     if (!profileData.success) {
      //       throw new Error(profileData.message || 'Failed to fetch profile');
      //     }
      //     const userProfile = profileData.results;
      //     dispatch(setCredentials({ token: data.token, refreshToken: data.refreshToken, user: userProfile }));
      //   } catch (error) {
      //     console.error('Failed to fetch and store institute profile after login:', error);
      //   }
      // },
    }),

    // Logout Endpoint
    logout: builder.mutation<LogoutResponse, LogoutRequest>({
      query: (data) => ({
        url: "/v1/auth/logout",
        method: "POST",
        data,
      }),
      transformResponse: (response: any): LogoutResponse => {
        return {
          success: true,
        };
      },
      transformErrorResponse: (response: any) => ({
        message: response?.data?.message || "An error occurred during logout",
        status: response?.status || 500,
      }),
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(logout());

        } catch (error) {
          console.error("Failed to handle logout:", error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useLoginStudentMutation,
  useVerifyEmailTeacherMutation,
  useResendOtpTeacherMutation,
  useLoginTeacherMutation,
  useVerifyEmailInstituteMutation,
  useResendOtpInstituteMutation,
  useLoginInstituteMutation,
  useLoginMutation,
  useLogoutMutation
} = authApi;