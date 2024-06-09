import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  orders: TOrder[];
};

const initialState: TOrdersState = {
  orders: []
};

const SLICE_NAME = 'orders';

export const getOrders = createAsyncThunk('orders/getOrder', async () =>
  getOrdersApi()
);

const ordersSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export default ordersSlice.reducer;
export const { getOrdersSelector } = ordersSlice.selectors;
