import { configureStore } from "@reduxjs/toolkit"
import toast from "~/store/slices/toast"

export const store = configureStore({
  reducer: {
    toast
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {toast: ToastState}
export type AppDispatch = typeof store.dispatch