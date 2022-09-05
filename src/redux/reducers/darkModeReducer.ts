import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    value: false
}

export const darkModeSlice = createSlice({
  name: 'theme-mode',
  initialState,
  reducers: {
    themeMode: (state: any) => {
      state.value = !state.value
    },
  },
})

// Action creators are generated for each case reducer function
export const { themeMode } = darkModeSlice.actions

export default darkModeSlice.reducer