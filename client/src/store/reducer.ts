import {combineReducers} from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import toastSlice from '~/store/slices/toast';
import userAnswerListSlice from '~/store/userAnswerListSlice';
import { Reducer } from 'react';

const combinedReducer: any = combineReducers({
    toast: toastSlice,
    userAnswerList: userAnswerListSlice,
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
