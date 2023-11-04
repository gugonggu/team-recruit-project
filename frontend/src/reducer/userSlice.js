import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "",
    },
    reducers: {
        loginUser: (state, action) => {
            state.username = action.payload.displayName;
        },

        clearUser: (state) => {
            state.username = "";
        },
    },
});

export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
