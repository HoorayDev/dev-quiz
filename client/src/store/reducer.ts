import {combineReducers} from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import counterSlice from './countSlice';

const combinedReducer = combineReducers({
    counter: counterSlice,
});

const rootReducer: typeof combinedReducer = (state, action) => {
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
