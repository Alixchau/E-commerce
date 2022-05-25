import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name:"cart",
  initialState:{
    userId:null,
    products:[],
    quantity:0, 
    total: 0 
  },
  reducers:{
    newCart:(state, action)=>{
      state.userId = action.payload._id;
      state.products =[];
      state.quantity = 0; 
      state.total= 0 
    },
    setCart:(state, action) =>{
      state.userId = action.payload._id;
      state.products = action.payload.products;
      state.quantity = action.payload.products.length();
      state.total = action.payload.products.reduce((accumulatedTotal , product)=> accumulatedTotal + product.quantity * product.price, 0);
      console.log(state.quantity);
      console.log(state.total);
    },
    logoutCart:(state) =>{
      state.userId = null;
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
/*     addDifferentProduct:(state, action) =>{
      
      state.products = state.products.map(product => {...product, quantity : product.quantity +1})

    }, */
    addProduct: (state, action) =>{
      //check if the product to add is existing item, if so just add the item quantity in product array
      const existingCartItem = state.products.find(
        (product) => product._id === action.payload._id
      );
        console.log(existingCartItem);

      if(existingCartItem){
        state.products = state.products.map(product => product._id === action.payload._id ? {...product, quantity:product.quantity +1}: product); 
      }
      else{
        state.quantity += 1; //cart quantity
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity; // product price * product quantity 
      }
    },
    decreaseProduct:(state, action) =>{

    }
  },
});

export const {newCart, setCart, logoutCart, addProduct} = cartSlice.actions;
export default cartSlice.reducer;