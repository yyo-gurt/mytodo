import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export function makeStore() {
    return configureStore({
        reducer: {}
    });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;