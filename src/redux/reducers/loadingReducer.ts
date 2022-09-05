import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isLoading: false
}

export const loadingSlice = createSlice({
  name: 'theme-mode',
  initialState,
  reducers: {
    loadingMode: (state: any, action: any) => {
      state.isLoading = action.payload
    },
  },
})

export const { loadingMode } = loadingSlice.actions

export default loadingSlice.reducer