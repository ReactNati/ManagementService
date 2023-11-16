import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name:"service",
    initialState:{
        service:[]
    },
    reducers:{
      
    addService:(state,action) =>{
        const id = new Date().toString() + Math.random().toString();
        state.service.push({ ...action.payload.service, id: id })

    },
 
    },
   
    
    
})
export const service = serviceSlice.actions.addService
// export const logout = authSlice.actions.logOut
export default serviceSlice.reducer;