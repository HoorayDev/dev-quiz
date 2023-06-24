import { createSlice } from "@reduxjs/toolkit";
import { isEqual } from 'lodash';

interface userAnswerListState{
    value: { quizId: string, selectedOption: string }[]
}

const initialState: userAnswerListState = {
    value: []
};

export const userAnswerListSlice = createSlice({
    name: 'userAnswerList',
    initialState,
    reducers: {
        add(state, action){
            const newAnswer = action.payload;

            // const isDuplicate = state.value.some((item) => isEqual(item, newAnswer));

            // if(!isDuplicate) state.value.push(newAnswer);

            const existingAnswer = state.value.find(obj => obj.quizId === newAnswer.quizId);

            if (existingAnswer) {
                existingAnswer.selectedOption = newAnswer.selectedOption; // 기존 객체의 value 업데이트
            } else {
                state.value.push(newAnswer); // 새로운 객체 추가
            }
        },
    },
    extraReducers: (builder) => {}
});

export const { add } = userAnswerListSlice.actions;
export default userAnswerListSlice.reducer;
