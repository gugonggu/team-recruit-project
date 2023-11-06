import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        uid: "",
        accessToken: "",
    },
    reducers: {
        loginUser: (state, action) => {
            state.name = action.payload.displayName;
            state.uid = action.payload.uid;
            state.accessToken = action.payload.accessToken;
        },

        clearUser: (state) => {
            state.name = "";
            state.uid = "";
            state.accessToken = "";
        },
    },
});

export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
