// src/features/api/axios.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
// import { logout } from '../auth/authSlice';
// import { store } from '../../lib/store';

// Axios instance with types
const axiosInstance: AxiosInstance = axios.create({
  // baseURL: 'https://api.inupgro.com',
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor with types
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  }
);

// Response interceptor with types
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError): Promise<never> => {
    if (error.response?.status === 401) {
      // Instead of dispatching logout, let the API slice handle the error
      console.warn('Unauthorized request (401). Please log in again.');
      // Optionally, clear tokens here if needed
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('authUser');
      }
   
      // store.dispatch(logout());

      //  if (typeof window !== 'undefined') {
      //   window.location.href = '/login';
      // }
    }
    return Promise.reject(error);
  }
);

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    { status?: number; message?: string }
  > =>
  async ({ url, method = 'GET', data, params, headers }) => {
    try {
      const response = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });
      return { data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message, 
          message:axiosError.message,
        },
      };
    }
  };

export default axiosInstance;