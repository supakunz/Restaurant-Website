import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cart: []
}

const cartSlice = createSlice({
  name: "cartlist",
  initialState,
  reducers: {
    addCart: (state, action) => {
      if (localStorage.getItem('cart')) {
        state.cart = [...JSON.parse(localStorage.getItem('cart'))]
      }
      state.cart = [...state.cart, action.payload]  // state.cart.push(action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cart))
      // console.log(current(state))
    },
    removeCart: (state, action) => {
      const Index = state.cart.findIndex((it) => it.name == action.payload)
      state.cart.splice(Index, 1) // delete data
      // console.log(current(state))
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    loadItem: (state) => {
      if (localStorage.getItem('cart')) {
        state.cart = [...JSON.parse(localStorage.getItem('cart'))]
      }
    }
  }
})

export const { addCart, removeCart, loadItem } = cartSlice.actions

export default cartSlice.reducer