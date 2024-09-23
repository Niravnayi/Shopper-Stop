import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const { name, price, image } = action.payload;
      state.cartItems.push({ name, price, image });
      state.total += price;
    },
    removeItemFromCart: (state, action) => {
      const { index, price } = action.payload;
      state.cartItems.splice(index, 1);
      state.total -= price;
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
