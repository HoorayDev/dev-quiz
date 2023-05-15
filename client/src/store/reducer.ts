import {combineReducers} from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import counterSlice from '~/store/countSlice';
import { Reducer } from 'react';

const combinedReducer: any = combineReducers({
    counter: counterSlice,
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
