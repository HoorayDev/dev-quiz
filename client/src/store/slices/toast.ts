import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: 'toast',
  initialState: { show: false, message: '' },
  reducers: {
    show: (state, action) => {
      if (state.show) {
        state.show = false
        state.message = ''
      }

      state.show = true
      state.message = action.payload
    },
    hide: (state) => {
      state.show = false
      state.message = ''
    }
  }
})

export const { show, hide } = toastSlice.actions;

export default toastSlice.reducer;