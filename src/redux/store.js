import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Slices/UserSlice";
import { createuser } from "./Slices/UserSlice";

const store=configureStore({
    reducer:{
        user:userReducer
    }
})
export {store,createuser}