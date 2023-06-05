import {combineReducers} from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import toastSlice from '~/store/slices/toast';
import incorrectSlice from '~/store/incorrectSlice';
import { Reducer } from 'react';

const combinedReducer: any = combineReducers({
    toast: toastSlice,
    incorrent:incorrectSlice,
});

const rootReducer: typeof combinedReducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        return nextState;
    } else {
        return combinedReducer(state, action)
    }
}
export default rootReducer;
