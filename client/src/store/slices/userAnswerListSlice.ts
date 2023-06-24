import { createSlice } from "@reduxjs/toolkit";
import { isEqual } from 'lodash';

interface userAnswerValue {
    quizId: string;
    selectedOption: string;
}
interface userAnswerListState{
    value: userAnswerValue[]
}

const initialState: userAnswerListState = {
    value: []
};

export const userAnswerListSlice = createSlice({
    name: 'userAnswerList',
    initialState,
    reducers: {
        addUserAnswerList(state, action){
            const newAnswer = action.payload;
            const existingAnswer = state.value.find(obj => obj.quizId === newAnswer.quizId);

            if (existingAnswer) {
                existingAnswer.selectedOption = newAnswer.selectedOption;
            } else {
                state.value.push(newAnswer);
            }
        },
        resetUserAnswerList: () => initialState,
    },
    extraReducers: (builder) => {}
});

export const { addUserAnswerList, resetUserAnswerList } = userAnswerListSlice.actions;
export default userAnswerListSlice.reducer;
export type { userAnswerValue };
