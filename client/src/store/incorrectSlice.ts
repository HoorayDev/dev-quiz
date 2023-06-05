import { createSlice } from "@reduxjs/toolkit";

interface IncorrectState{
    value: number[]
}

const initialState: IncorrectState = {
    value: []
};

export const incorrectSlice = createSlice({
    name: 'incorrect',
    initialState,
    reducers: {
        add(state, action){
            const message = action.payload;
            state.value.push(message);
        },
    },
    extraReducers: (builder) => {}
});

export const { add } = incorrectSlice.actions;
export default incorrectSlice.reducer;
