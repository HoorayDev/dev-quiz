import {
    configureStore,
    getDefaultMiddleware,
    ThunkAction,
    Action} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {useDispatch} from 'react-redux';
import rootReducer from './reducer';

const makeStore = () => {
    const middleware = getDefaultMiddleware();
    const store = configureStore({
        reducer: rootReducer,
        middleware,
        /* custom middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(사용자 정의)  */
        devTools: process.env.NODE_ENV === 'development',
    })
    return store;
}

const wrapper = createWrapper(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action
    >;

export default wrapper;
