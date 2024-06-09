import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TNewOrderState = {
  order: TOrder | null;
  name: string;
  orderRequest: boolean;
};

const initialState: TNewOrderState = {
  order: null,
  name: '',
  orderRequest: false
};

const SLICE_NAME = 'orderBurger';

export const orderBurger = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

const orderBurgerSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getBurgerSelector: (state) => state,
    getRequestSelector: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.order = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.name = action.payload.name;
        state.orderRequest = false;
      });
  }
});

export default orderBurgerSlice.reducer;
export const { getBurgerSelector, getRequestSelector } =
  orderBurgerSlice.selectors;
