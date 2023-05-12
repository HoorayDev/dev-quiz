import { createSlice } from "@reduxjs/toolkit";

interface CountState{
    value: number
}

const initialState: CountState = {
    value: 0
};

export const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        increment(state){
            state.value += 1;
        },
        decrement(state){
            state.value -= 1;
        }
    },
    extraReducers: (builder) => {}
});

export const { increment, decrement } = countSlice.actions;
export default countSlice.reducer;
