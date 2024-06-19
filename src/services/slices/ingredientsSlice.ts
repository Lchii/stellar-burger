import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: true
};

const SLICE_NAME = 'ingredients';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getLoadingSelector: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.isIngredientsLoading = false;
    });
  }
});

export default ingredientsSlice.reducer;
export const { getIngredientsSelector, getLoadingSelector } =
  ingredientsSlice.selectors;
export const getIngredientSelector =
  (id: string | undefined) => (state: RootState) =>
    state[SLICE_NAME].ingredients.find((i) => i._id === id);
