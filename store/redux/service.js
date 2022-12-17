import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name:"service",
    initialState:{
        service:[]
    },
    reducers:{
        // switch (action.type) {
        //     case 'ADD':
        //       const id = new Date().toString() + Math.random().toString();
        //       return [{ ...action.payload, id: id }, ...state];
        //     case 'SET':
        //       const inverted = action.payload.reverse()
        
        //       return inverted;
        //     case 'UPDATE':
        //       const updatableExpenseIndex = state.findIndex(
        //         (expense) => expense.id === action.payload.id
        //       );
        //       const updatableExpense = state[updatableExpenseIndex];
        //       const updatedItem = { ...updatableExpense, ...action.payload.data };
        //       const updatedExpenses = [...state];
        //       updatedExpenses[updatableExpenseIndex] = updatedItem;
        //       return updatedExpenses;
        //     case 'DELETE':
        //       return state.filter((expense) => expense.id !== action.payload);
        //     default:
        //       return state;
        //   }    
    addService:(state,action) =>{
        const id = new Date().toString() + Math.random().toString();
        state.service.push({ ...action.payload.service, id: id })
       // return [{ ...action.payload, id: id }, ...state];

    },
    // removeService: (state,action) => {
    //     state.service.splice(state.service,indexof(action.payload.id),1)
    // },  
    // authenticate: (state,action) => {
    //     state.token = action.payload.token;
    //     state.isAuthenticated =  !!action.payload.token;
    // },
    // logOut: (state,action) => { 
    //     state.token = null;
    //     state.isAuthenticated = false
    // },
    },
    // extraReducers: (builder) => 
    //     builder.addCase(authSlice.actions.logOut,()=>initialState)
    
    
})
export const service = serviceSlice.actions.addService
// export const logout = authSlice.actions.logOut
export default serviceSlice.reducer;