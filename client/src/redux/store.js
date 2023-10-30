import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/CartReducer";

export default configureStore({
    reducer: {
        cart: cartReducer,
    },
});
