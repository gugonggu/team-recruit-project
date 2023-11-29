import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        _id: "",
        name: "",
        email: "",
    },
    reducers: {
        loginUser: (state, action) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },

        clearUser: (state) => {
            state._id = "";
            state.name = "";
            state.email = "";
        },
    },
});

export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
