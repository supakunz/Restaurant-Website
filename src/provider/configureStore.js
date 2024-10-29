import { configureStore } from '@reduxjs/toolkit'
import foodSlice from '../store/foodSlice'
import UserSlice from '../store/UserSlice';
import cartSlice from '../store/cartSlice';

const store = configureStore({
  reducer: {
    foods: foodSlice,
    user: UserSlice,
    cartlist: cartSlice
  }
})

export default store;