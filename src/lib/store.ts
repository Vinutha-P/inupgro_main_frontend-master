import { configureStore } from "@reduxjs/toolkit";
import { schoolsApi } from "../features/api/schoolApiSlice";
import { collegesApi } from "../features/api/collegeApiSlice";
import { coachingsApi } from "../features/api/instituteApiSlice";
import { authApi } from "../features/api/authApiSlice";
import { jobApplicationApi } from "../features/api/jobApplicationApiSlice";
import { jobsApi } from "../features/api/jobApiSlice";
import { s3Api } from "../features/api/s3ApiSlice";
import { newsletterApi } from "@/features/api/newsApiSlice";
import { homepageApi } from "../features/api/homepageApiSlice";
import { studentsApi } from "../features/api/studentsApiSlice";
import { teacherApi } from "../features/api/teacherApiSlice";
import { instituteRegisterApi } from "../features/api/instituteRegisterSlice";
import { instituteApi } from "../features/api/academicInstitutes"; // Add the new slice
import authReducer from "@/features/auth/authSlice";
import jobApplicationReducer from "@/features/jobApplication/jobApplicationSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import notificationReducer from "@/features/notification/notificationSlice";
import { subscriptionApi } from "@/features/api/subscriptions";
import globalReducer from "@/features/globalSlice";
import newsReducer from "@/features/newsSlice";
import { commonApi } from "@/features/api/commonApiSlice";
import { dashboardApi } from "@/features/api/dashboardApiSlice";
import { couponApi } from "@/features/api/couponApiSlice";
import { educationNewsApi } from "@/features/api/educationNewsApiSlice";

export const store = configureStore({
  reducer: {
    [schoolsApi.reducerPath]: schoolsApi.reducer,
    [collegesApi.reducerPath]: collegesApi.reducer,
    [coachingsApi.reducerPath]: coachingsApi.reducer,
    [newsletterApi.reducerPath]: newsletterApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [jobApplicationApi.reducerPath]: jobApplicationApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [s3Api.reducerPath]: s3Api.reducer,
    [homepageApi.reducerPath]: homepageApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [instituteRegisterApi.reducerPath]: instituteRegisterApi.reducer,
    [instituteApi.reducerPath]: instituteApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [educationNewsApi.reducerPath]: educationNewsApi.reducer,

    auth: authReducer,
    jobApplication: jobApplicationReducer,
    notification: notificationReducer,
    global: globalReducer,
    news: newsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      schoolsApi.middleware,
      collegesApi.middleware,
      coachingsApi.middleware,
      newsletterApi.middleware,
      authApi.middleware,
      jobApplicationApi.middleware,
      jobsApi.middleware,
      s3Api.middleware,
      homepageApi.middleware,
      studentsApi.middleware,
      teacherApi.middleware,
      instituteRegisterApi.middleware,
      instituteApi.middleware,
      subscriptionApi.middleware,
      commonApi.middleware,
      dashboardApi.middleware,
      couponApi.middleware,
      educationNewsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
