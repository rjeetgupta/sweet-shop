import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/authStore";
import sweetSlice from "@/store/sweetStore";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        sweets: sweetSlice,
    },
});