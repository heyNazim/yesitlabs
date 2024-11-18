import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice.js";

// create store
export const store = configureStore({
    reducer:{
        allCart:cartSlice
    }
})