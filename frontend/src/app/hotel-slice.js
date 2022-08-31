/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    storeHotels: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { storeHotels } = hotelSlice.actions;
export default hotelSlice.reducer;
