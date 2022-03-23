import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0, num: 1 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCounter: (state) => {
      state.value = state.value + 1;
    },
    decrementCounter: (state) => {
      state.value = state.value - 1;
    },
    rdnCounter: (state, action) => {
      state.num = state.num * action.payload;
    },
    incrementByAmount: (state, action) => {
      state.value = state.value + action.payload;
    },
  },
});

const { actions, reducer } = counterSlice;
export default reducer;

export const { incrementCounter, decrementCounter, rdnCounter, incrementByAmount } = actions;
