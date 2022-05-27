import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    userId: null,
    products: [],
    quantity: 0,
    total: 0
  },
  reducers: {
    newCart: (state, action) => {
      state.userId = action.payload._id;
      state.products = [];
      state.quantity = 0;
      state.total = 0
    },
    setCart: (state, action) => {
      state.userId = action.payload.userId;
      state.products = action.payload.products;
      state.quantity = action.payload.products.reduce((cartItemQuantity) => cartItemQuantity + 1, 0);
      state.total = action.payload.products.reduce((accumulatedTotal, product) => accumulatedTotal + product.quantity * product.price, 0);

    },
    addProduct: (state, action) => {
      //check if the product to add is existing item with same id, color and size, if so just add the item quantity in product array
      const existingCartItem = state.products.find(
        (product) => product._id === action.payload._id && product.color === action.payload.color && product.size === action.payload.size
      );
      if (existingCartItem) {
        state.products = state.products.map(product => product._id === action.payload._id && product.color === action.payload.color && product.size === action.payload.size ? { ...product, quantity: product.quantity + 1 } : product);
        state.total = state.products.reduce((total, product) => total + product.quantity * product.price, 0);
      }
      else {
        state.quantity += 1; //cart quantity
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity; // product price * product quantity 
      }
    },
    decreaseProduct: (state, action) => {
      //find the item to be deleted
      const existingCartItem = state.products.find(
        (product) => product._id === action.payload._id && product.color === action.payload.color && product.size === action.payload.size
      );
      //if the existing item quantity is 1, remove is from products array, else minus the product quantity in array
      if (existingCartItem.quantity === 1) {
        state.products = state.products.filter(product => product._id !== action.payload._id || product.color !== action.payload.color || product.size !== action.payload.size);
        state.quantity -= 1;

      } else {
        state.products = state.products.map(product => product._id === action.payload._id && product.color === action.payload.color && product.size === action.payload.size ? { ...product, quantity: product.quantity - 1 } : product);

      }
      state.total -= action.payload.price;
    }
  },
});

export const { newCart, setCart, logoutCart, addProduct, decreaseProduct } = cartSlice.actions;
export default cartSlice.reducer;