import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from '../authSlice/authSlice';

const store = configureStore({
    reducer: {
      userAuth: authSlice.reducer,
    },
  });

  export default store;