// import { createSlice } from "@reduxjs/tookit";

// const initialState = {
//   fetching: false,
//   data: null,
//   error: false,
//   errData: null,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     cartStart: (state, action) => {
//       state.fetching = true;
//     },

//     cartFail: (state, action) => {
//       state.error = true;
//       state.errData = action.payload;
//     },

//     addCart: (state, action) => {
//       if (state.data.findIndex((i) => i == action.payload) != -1) {
//         state.data = state.data.push(action.payload);
//       } else {
//         state.data.quantity += 1;
//       }
//     },

//     removeCart: (state, action) => {
//       const index = state.data.findIndex((i) => i == action.payload);
//       state.data = state.data.splice(index, 1);
//     },
//   },
// });

// export const { cartStart, cartFail, addCart, removeCart } = cartSlice.actions;
// export default cartSlice.reducer;
