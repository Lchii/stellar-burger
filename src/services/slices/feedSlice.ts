import { getFeedsApi } from '@api';
import { TOrder } from '../../utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isFeedsLoading: boolean;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isFeedsLoading: true
};

const SLICE_NAME = 'feeds';

export const getFeeds = createAsyncThunk('feeds/getFeeds', async () =>
  getFeedsApi()
);

const feedSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isFeedsLoading = false;
      });
  }
});

export default feedSlice.reducer;
export const { getFeedSelector } = feedSlice.selectors;
