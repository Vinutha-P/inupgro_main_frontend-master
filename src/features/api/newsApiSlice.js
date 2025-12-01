import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios";

export const newsletterApi = createApi({
  reducerPath: "newsletterApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Newsletter'],
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: ({ path } = {}) => ({
        url: path || "/news/newsletter",
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "Newsletter", id: "LIST" }] : [],
    }),
    
    getNewsByCategory: builder.query({
      query: ({ newscategory_id, offset = 1, path }) => ({
        url: path || `/news/newsletter/${newscategory_id}/${offset}`,
        method: "GET",
      }),
      providesTags: (result, error, { newscategory_id }) => [
        { type: "Newsletter", id: `CATEGORY_${newscategory_id}` },
      ],
    }),

    getNewsByCategoryAndDate: builder.query({
      query: ({ newscategory_id, offset = 1, date, path }) => ({
        url:
          path || `/news/newsletter/${newscategory_id}/${offset}/date/${date}`,
        method: "GET",
      }),
      providesTags: (result, error, { newscategory_id, date }) => [
        { type: "Newsletter", id: `CATEGORY_${newscategory_id}_DATE_${date}` },
      ],
    }),

    getNewsByLanguage: builder.query({
      query: ({ newscategory_id, offset = 1, language_code,                                                                                                                                                         path }) => ({
        url:
          path ||
          `/news/newsletter/${newscategory_id}/${offset}/language/${language_code}`,
        method: "GET",
      }),
      providesTags: (result, error, { newscategory_id, language_code }) => [
        {
          type: "Newsletter",
          id: `CATEGORY_${newscategory_id}_LANGUAGE_${language_code}`,
        },
      ],
    }),

    searchNewsByCategoryAndPhrase: builder.query({
      query: ({ newscategory_id, offset = 1, phrase, path }) => ({
        url:
          path ||
          `/news/newsletter/${newscategory_id}/${offset}/search/${phrase}`,
        method: "GET",
      }),
      providesTags: (result, error, { newscategory_id, phrase }) => [
        {
          type: "Newsletter",
          id: `CATEGORY_${newscategory_id}_SEARCH_${phrase}`,
        },
      ],
    }),

    getNewsByCategoryAndSubcategory: builder.query({
      query: ({ newscategory_id, newssubcategory_id, offset = 1, path }) => ({
        url:
          path ||
          `/news/newsletter/${newscategory_id}/${newssubcategory_id}/${offset}`,
        method: "GET",
      }),
      providesTags: (
        result,
        error,
        { newscategory_id, newssubcategory_id }
      ) => [
        {
          type: "Newsletter",
          id: `CATEGORY_${newscategory_id}_SUBCATEGORY_${newssubcategory_id}`,
        },
      ],
    }),

    getAllNewsByCategoryAndSubcategory: builder.query({
      query: ({ newscategory_id, newssubcategory_id, path }) => ({
        url:
          path ||
          `news/newsletter/subcategory/${newscategory_id}/${newssubcategory_id}`,
        method: "GET",
      }),
      providesTags: (
        result,
        error,
        { newscategory_id, newssubcategory_id }
      ) => [
        {
          type: "Newsletter",
          id: `CATEGORY_${newscategory_id}_SUBCATEGORY_${newssubcategory_id}`,
        },
      ],
    }),

    getNewsByCategorySubcategoryAndDate: builder.query({
      query: ({
        newscategory_id,
        newssubcategory_id,
        offset = 1,
        date,
        path,
      }) => ({
        url:
          path ||
          `/news/newsletter/${newscategory_id}/${newssubcategory_id}/${offset}/date/${date}`,
        method: "GET",
      }),
      providesTags: (
        result,
        error,
        { newscategory_id, newssubcategory_id, date }
      ) => [
        {
          type: "Newsletter",
          id: `CATEGORY_${newscategory_id}_SUBCATEGORY_${newssubcategory_id}_DATE_${date}`,
        },
      ],
    }),

    getNewsByCategorySubcategoryAndLanguage: builder.query({
      query: ({
        newscategory_id,
        newssubcategory_id,
        offset = 1,
        language_code,
        path,
      }) => ({
        url:
          path ||
          `/news/newsletter/${newscategory_id}/${newssubcategory_id}/${offset}/language/${language_code}`,
        method: "GET",
      }),
      providesTags: (
        result,
        error,
        { newscategory_id, newssubcategory_id, language_code }
      ) => [
        {
          type: "Newsletter",
          id: `CATEGORY_${newscategory_id}_SUBCATEGORY_${newssubcategory_id}_LANGUAGE_${language_code}`,
        },
      ],
    }),

    searchNewsByCategorySubcategoryAndPhrase: builder.query({
      query: ({
        newscategory_id,
        newssubcategory_id,
        offset = 1,
        phrase,
        path,
      }) => ({
        url:
          path ||
          `/news/newsletter/${newscategory_id}/${newssubcategory_id}/${offset}/search/${phrase}`,
        method: "GET",
      }),
      providesTags: (
        result,
        error,
        { newscategory_id, newssubcategory_id, phrase }
      ) => [
        {
          type: "Newsletter",
          id: `CATEGORY_${newscategory_id}_SUBCATEGORY_${newssubcategory_id}_SEARCH_${phrase}`,
        },
      ],
    }),

    searchAllNews: builder.query({
      query: ({ query, path, offset = 1 }) => ({
        url: path || `/news/search/${offset}/${query}`,
        method: "GET",
        // params: { query, offset }, // Pass query and offset as query params
      }),
      providesTags: (result, error, { query }) => [
        { type: "Newsletter", id: `SEARCH_ALL_${query}` },
      ],
    }),

    getNewsByTags: builder.query({
      query: ({ newscategory_id, tags }) => ({
        url:  `/news/newsletter/${newscategory_id}/1/tags`,
        method: "GET",
        params: { tags } 
      }
    )
    }),
  }),
});

export const {
  useGetAllNewsQuery,
  useGetNewsByCategoryQuery,
  useGetNewsByCategoryAndDateQuery,
  useGetNewsByLanguageQuery,
  useSearchNewsByCategoryAndPhraseQuery,
  useGetNewsByCategoryAndSubcategoryQuery,
  useGetAllNewsByCategoryAndSubcategoryQuery,
  useGetNewsByCategorySubcategoryAndDateQuery,
  useGetNewsByCategorySubcategoryAndLanguageQuery,
  useSearchNewsByCategorySubcategoryAndPhraseQuery,
  useSearchAllNewsQuery,
  useGetNewsByTagsQuery
} = newsletterApi;
