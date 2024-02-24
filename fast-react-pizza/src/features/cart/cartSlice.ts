import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  cart: [
    // {
    //   pizzaId: 12,
    //   name: 'Mediterranean',
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
  ],
};

function deleteItemFromArray(itemId, arr) {
  const itemIndex = arr.findIndex((i) => i.pizzaId === itemId);
  arr.splice(itemIndex, 1);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload }) {
      state.cart.push(payload);
    },
    deleteItem(state, { payload }) {
      // const itemIndex = state.cart.findIndex((i) => i.pizzaId === payload);
      // state.cart.splice(itemIndex, 1);
      // Use a layer of abstraction which is not nessecary in this case!
      deleteItemFromArray(payload, state.cart);
    },
    increaseItemQuantity(state, { payload }) {
      const item = state.cart.find((i) => i.pizzaId === payload);

      if (item && typeof item.quantity === 'number') {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((i) => i.pizzaId === action.payload);

      if (item && typeof item.quantity === 'number') {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }

      // Fire an action from another action handler in the same slice
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Reselect library is required to optimize these selectors in larg projects.
export const getTotalCartQuantity = (state) => {
  const numOfItems = state.cart.cart.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return numOfItems;
};

// Example of handle selector function using
// I noticed that there is a create selector function in redux toolkit
export const memoizedgetTotalCartQuantity = createSelector(
  [(state) => state.cart],
  (cart) => cart.cart.reduce((acc, item) => acc + item.quantity, 0),
);

export const memorizedGetCart = createSelector(
  [(state) => state.cart],
  (cart) => cart.cart,
);

export const getTotalCartPrice = (state) => {
  const numOfItems = state.cart.cart.reduce(
    (acc, item) => acc + item.unitPrice,
    0,
  );

  return numOfItems;
};

export const getPizzaQuantityById = (id) => (state) => {
  const pizzaItem = state.cart.cart.find((pizza) => pizza.pizzaId === id);

  return pizzaItem ? pizzaItem.quantity : 0;
};
