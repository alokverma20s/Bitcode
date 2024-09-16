import { configureStore } from '@reduxjs/toolkit'
import userInfo from './Slices/userInfo'
export const store = configureStore({
    reducer:{
        userInfo,
    },
})