import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/user'
import debtReducer from './slices/debt'


export const store = configureStore({
  reducer: {
    auth: userReducer,
    debt: debtReducer,
  }
})