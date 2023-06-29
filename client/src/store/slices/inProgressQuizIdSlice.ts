import { createSlice } from "@reduxjs/toolkit";
import { isEqual } from 'lodash';
interface inProgressQuizIdType {
    quizId: string;
    quizSetId: string;
}

interface inProgressQuizIdSliceType {
    value: inProgressQuizIdType
}

const initialState: inProgressQuizIdSliceType = {
    value: { quizId: '', quizSetId: '' },
};

export const inProgressQuizIdSlice = createSlice({
    name: 'inProgressQuizId',
    initialState,
    reducers: {
        setQuizInfo(state, action){
            const { quizId, quizSetId } = action.payload;
            state.value.quizId = quizId;
            state.value.quizSetId = quizSetId;
        },
        resetQuizInfo: () => {},
    },
    extraReducers: (builder) => {}
});

export const { setQuizInfo, resetQuizInfo } = inProgressQuizIdSlice.actions;
export default inProgressQuizIdSlice.reducer;
export type { inProgressQuizIdType };
