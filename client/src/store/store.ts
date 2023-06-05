import {
  combineReducers,
  configureStore,
  PayloadAction,
  ThunkAction,
  Action
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import logger from 'redux-logger';
import rootReducer from '~/store/reducer';


const makeStore = () =>
  configureStore({
    reducer : rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
  });

const store = makeStore();


export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === 'development'
});
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {toast: ToastState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
  >;