import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt; 
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;

// function customerReducer(state = initialStateCustomer, { type, payload }) {
//   switch (type) {
//     case "customer/createCustomer":
//       return { ...state, ...payload };

//     case "customer/updateName":
//       return { ...state, fullName: payload };

//     default:
//       return state;
//   }
// }

// function createCustomer(fullName, nationalID) {
//   return {
//     type: "customer/createCustomer",
//     payload: {
//       fullName,
//       nationalID,
//       createdAt: new Date().toISOString(),
//     },
//   };
// }

// function updateName(fullName) {
//   return { type: "customer/updateName", payload: fullName };
// }

// export { createCustomer, updateName };

// export default customerReducer;
