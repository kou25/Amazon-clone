import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(item=> item.id === action.payload.id);
      let newCart=[...state.items]
      if(index>=0){
        newCart.splice(index, 1)
      }
      else{
        console.warn(`Can't remove product (id: ${action.payload.id}) as it's not in basket`)
      }
      state.items=newCart
    },
    clearBasket: (state, action) => {
      state.items = [];
  },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + (item.price * 75),0);


export default basketSlice.reducer;
