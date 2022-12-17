import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import serviceReducer from './service'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        service: serviceReducer
    }
})