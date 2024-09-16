import  {createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    initialState: {
        id: '',
        username:'',
        email: "",
    },
    name: "userInfo",
    reducers:{
        addInfo: (state, action)=>{
            state.email = action.payload.email
            state.id = action.payload.id
            state.username = action.payload.username
        }
    }
})

export const  { addInfo } = userSlice.actions;
export default userSlice.reducer;