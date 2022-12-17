import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        token: '',
        isAuthenticated: false,
    },
    reducers:{
    authenticate: (state,action) => {
        state.token = action.payload.token;
        state.isAuthenticated =  !!action.payload.token;
    },
    logOut: (state,action) => { 
        state.token = null;
        state.isAuthenticated = false
    },
    },
    extraReducers: (builder) => 
        builder.addCase(authSlice.actions.logOut,()=>initialState)
    
    
})
export const authenticate = authSlice.actions.authenticate
export const logout = authSlice.actions.logOut
export default authSlice.reducer;