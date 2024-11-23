import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: false,
        college: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            console.log("user set");
        },
        setCollege: (state, action) => {
            state.college = action.payload;
            console.log("college set");
        },
        logout: (state) => {
            // Reset the state to its initial values
            state.loading = false;
            state.user = false;
            state.college = false;
            console.log("auth state reset");
        },
    },
});

export const { setLoading, setUser, setCollege, logout } = authSlice.actions;
export default authSlice.reducer;
