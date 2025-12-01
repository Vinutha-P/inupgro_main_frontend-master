import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios';

export const educationNewsApi = createApi({
    reducerPath: 'educationNews',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['EducationNews'],
    endpoints: (builder) => ({
        getAllNews: builder.query({
            query: ({
                category = "",
                sortType = "asc",
                sortBy = "",
                keyword = "",
                status = "declined",
                limit = 10,
                page = 1,
            } = {}) => ({
                url: `/v1/news/list?page=${page}&limit=${limit}&status=${status}&keyword=${keyword}&sortBy=${sortBy}&sortType=${sortType}&category=${category}`,
                method: "GET"
            }),
            transformResponse: (response) => response.results || [],
        }),
        getAllEducationNews: builder.query({
            query: ({
                limit = 10,
                page = 1,
            } = {}) => ({
                url: `/v1/news/list?page=${page}&limit=${limit}`,
                method: "GET"
            }),
            transformResponse: (response) => response.results || [],
        }),

        createNews: builder.mutation({
            query: (news) => ({
                url: "/v1/news/add",
                method: "POST",
                data: news,
            }),
            invalidatesTags: ["EducationNews"],
        }),
        updateNews: builder.mutation({
            query: ({id,body}) => ({
                url: `/v1/news/edit/${id}`,
                method: "PUT",
                data: body,
            }),
            invalidatesTags: ["EducationNews"],
        }),
        detailNews: builder.query({
            query: (id) => ({
                url: `/v1/news/detail/${id}`,
                method: "GET",
            }),
            invalidatesTags: ["EducationNews"],
        }),
        removeNews: builder.mutation({
            query: (id) => ({
                url: `/v1/news/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['EducationNews'],
        }),
        categoryList:builder.query({
            query: () => ({
                url: `/v1/common/category-list`,
                method: "GET",
            }),
            invalidatesTags: ["EducationNews"],
        }),
        subCategoryList:builder.query({
            query: (id) => ({
                url: `/v1/common/subcategory-list?categoryId=${id}`,
                method: "GET",
            }),
            invalidatesTags: ["EducationNews"],
        }),
    }),
});

export const {
    useGetAllNewsQuery,
    useCreateNewsMutation,
    useUpdateNewsMutation,
    useDetailNewsQuery,
    useRemoveNewsMutation,
    useCategoryListQuery,
    useSubCategoryListQuery,
} = educationNewsApi;
