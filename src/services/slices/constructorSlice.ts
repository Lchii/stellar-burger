import {
  TConstructorIngredient,
  TIngredient,
  MovementDirection,
  TMovableConstructorIngredient
} from '../../utils/types';
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const SLICE_NAME = 'burgerConstructor';

const moveElement = <T>(
  index: number,
  array: T[],
  direction: MovementDirection
): T[] => {
  let neighborIndex;
  switch (direction) {
    case MovementDirection.UP:
      neighborIndex = index - 1;
      break;
    case MovementDirection.DOWN:
      neighborIndex = index + 1;
      break;
  }
  const minIndex = Math.min(index, neighborIndex);
  return [
    ...array.slice(0, minIndex),
    array[minIndex + 1],
    array[minIndex],
    ...array.slice(minIndex + 2)
  ];
};

const constructorSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setBun: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.bun = action.payload;
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload.id
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<TMovableConstructorIngredient>
    ) => {
      const index = state.ingredients.findIndex(
        (i) => i.id === action.payload.id
      );
      state.ingredients = moveElement<TConstructorIngredient>(
        index,
        state.ingredients,
        action.payload.direction
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  }
});

export default constructorSlice.reducer;
export const { getConstructorSelector } = constructorSlice.selectors;
export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;
