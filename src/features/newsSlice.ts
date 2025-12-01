import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewsAnalytics {
  percentage: number;
  isPositive: boolean;
}

interface NewsDetails {
  totalPublishedNews: number;
  publishedNewsAnalytics: NewsAnalytics;
  totalActiveReaders: number;
  activeReadersAnalytics: NewsAnalytics;
  totalTrendingNews: number;
  trendingNewsAnalytics: NewsAnalytics;
}

interface NewsState {
  newsDetails: NewsDetails | null;
  newsStatus: string;
  category: string;
  subCategory: string;
  selectedHashtags: string[];
  selectedImage: string;
  formErrors: {
    [key: string]: string;
  };
}

const initialState: NewsState = {
  newsDetails: null,
  newsStatus: "",
  category: '',
  subCategory: '',
  selectedHashtags: [],
  selectedImage: "",
  formErrors: {},
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsDetails: (state, action: PayloadAction<NewsDetails>) => {
      state.newsDetails = action.payload;
    },
    setNewsStatus: (state, action: PayloadAction<string>) => {
      state.newsStatus = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setSubCategory: (state, action: PayloadAction<string>) => {
      state.subCategory = action.payload
    },
    setSelectedHashtags: (state, action: PayloadAction<string[]>) => {
      state.selectedHashtags = action.payload
    },
    setSelectedImage: (state, action: PayloadAction<string>) => {
      state.selectedImage = action.payload;
    },
    setFormError: (state, action: PayloadAction<{ field: string; message: string }>) => {
      state.formErrors[action.payload.field] = action.payload.message;
    },
    setMultipleFormErrors: (state, action: PayloadAction<{ [key: string]: string }>) => {
      state.formErrors = action.payload;
    },
    clearFormError: (state, action: PayloadAction<string>) => {
      delete state.formErrors[action.payload];
    },
    clearFormErrors: (state) => {
      state.formErrors = {};
    },
  },
});

export const { setNewsDetails,
  setNewsStatus,
  setCategory,
  setSubCategory,
  setSelectedHashtags,
  setSelectedImage,
  setFormError,
  setMultipleFormErrors,
  clearFormError,
  clearFormErrors,
} = newsSlice.actions;
export default newsSlice.reducer;
