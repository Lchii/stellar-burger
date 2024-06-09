import { getOrderByNumberApi } from '@api';
import { TOrder } from '../../utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TOrderInfoState = {
  order: TOrder | null;
};

const initialState: TOrderInfoState = {
  order: null
};

const SLICE_NAME = 'orderInfo';

export const getOrderByNumber = createAsyncThunk(
  'getOrderInfo',
  async (number: number) => getOrderByNumberApi(number)
);

const orderInfoSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getOrderByNumberSelector: (state) => state.order,
    getOrderNumber: (state) => state.order?.number
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.order = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0] ?? null;
      });
  }
});

export default orderInfoSlice.reducer;
export const { getOrderByNumberSelector, getOrderNumber } =
  orderInfoSlice.selectors;
