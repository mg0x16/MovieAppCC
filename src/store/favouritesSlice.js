import {createSlice} from '@reduxjs/toolkit';

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    value: [],
  },
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    remove: (state, action) => {
      state.value = state.value.filter(i => i.id !== action.payload.id);
    },
  },
});

export const {add, remove} = favouritesSlice.actions;

export default favouritesSlice.reducer;
