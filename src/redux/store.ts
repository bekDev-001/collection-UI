import { configureStore } from '@reduxjs/toolkit'
import darkModeReducer from './reducers/darkModeReducer'
import loadingReducer from './reducers/loadingReducer'

export const store = configureStore({
  reducer: {
    darkTheme: darkModeReducer,
    loading: loadingReducer,
  },
})