import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  food: []
}

const foodSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    fetchFood: (state, action) => {
      state.food = action.payload
    }
  }
})

export const { fetchFood } = foodSlice.actions

export default foodSlice.reducer