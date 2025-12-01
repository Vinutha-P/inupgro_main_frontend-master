import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface SubscriptionDoc {
  userId: string;
  planId: string;
  subscriptionId: string;
  status: string;
  startDate: string;
  nextBillingDate: string;
  amount: number;
  planType: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface GlobalState {
  paramId: string;
  planId: string;
  userId: string;
  type: string;
  couponCode: string;
  subscriptionDoc: SubscriptionDoc | null;
}

const initialState: GlobalState = {
  paramId: "",
  planId: "",
  userId: "",
  type: "",
  couponCode: "",
  subscriptionDoc: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setParamId: (state, action: PayloadAction<string>) => {
      state.paramId = action.payload;
    },
    setPlanId: (state, action: PayloadAction<string>) => {
      state.planId = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setCouponCode: (state, action: PayloadAction<string>) => {
      state.couponCode = action.payload;
    },
    setSubscriptionDoc: (state, action: PayloadAction<SubscriptionDoc>) => {
      state.subscriptionDoc = action.payload;
    },
  },
});

export const {setParamId, setPlanId, setUserId, setType,setCouponCode , setSubscriptionDoc } = globalSlice.actions;
export default globalSlice.reducer;
