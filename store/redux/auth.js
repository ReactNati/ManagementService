import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        token: '',
        email:'',
        isAuthenticated: false,
        firstLaunch:false,
    },
    reducers:{
    authenticate: (state,action) => {
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.isAuthenticated =  !!action.payload.token;
        state.firstLaunch = action.payload.firstLaunch;

    },
    logOut: (state,action) => { 
        state.email = null;
        state.token = null;
        state.isAuthenticated = false;
        state.firstLaunch = false;
        
    },
    setFirstLaunch: (state, action) => {
        state.firstLaunch = action.payload.firstLaunch;
    },
    },
    extraReducers: (builder) => 
        builder.addCase(authSlice.actions.logOut,()=>initialState)
    
    
})
export const setFirstLaunch = authSlice.actions.setFirstLaunch
export const authenticate = authSlice.actions.authenticate
export const logout = authSlice.actions.logOut
export default authSlice.reducer;