import { createSlice } from "@reduxjs/toolkit";
import { isEqual } from 'lodash';
interface quizResultType {
    correctCount: string;
    inCorrectCount: string;
}

interface quizResultSliceSliceType {
    value: quizResultType
}

const initialState: quizResultSliceSliceType = {
    value: { correctCount: '', inCorrectCount: '' },
};

export const quizResultSlice = createSlice({
    name: 'quizResult',
    initialState,
    reducers: {
        setQuizResult(state, action){
            const { correctCount, inCorrectCount } = action.payload;
            state.value.correctCount = correctCount;
            state.value.inCorrectCount = inCorrectCount;
        },
        resetQuizResult: () => {},
    },
    extraReducers: (builder) => {}
});

export const { setQuizResult, resetQuizResult } = quizResultSlice.actions;
export default quizResultSlice.reducer;
