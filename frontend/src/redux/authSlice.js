import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{
        loading: false,
        user: true
    },
    reducers:{
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            console.log("user set");
        }
    }
})

export const {setLoading, setUser} = authSlice.actions;
export default authSlice.reducer;
