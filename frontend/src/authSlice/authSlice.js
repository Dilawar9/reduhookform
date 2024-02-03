
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"


// async login calls
export const asyncLogin = createAsyncThunk('authSlice/asyncLogin', async (credentials) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/user/login`, credentials);
        return res.data;
    } catch (error) {
        console.log(error.message)
    }
}
)

// async signup

export const asyncsignup = createAsyncThunk('authSlice/asyncsignup', async (credentials,{ rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/user/signup`, credentials);
        return res.data;
    } catch (error) {
        console.log(error.message)
    }
}
)

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        loading: false,
        userInfo: null,
        userToken: null,
        error: null,
        isLogin: false,
        success: false,
    },
    reducers: {
        loginStart: (state) => { }
    },

    // loginreducer
    extraReducers: (builder) => {
        builder.addCase(asyncLogin.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(asyncLogin.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status == "success") {
                state.userToken = action.payload.token;
                state.isLogin = true;
            }
        })
        builder.addCase(asyncLogin.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })

        // signup reducer

        builder.addCase(asyncsignup.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(asyncsignup.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status == "success") {
                state.userToken = action.payload.token;
                state.isLogin = false;
            }
        })
        builder.addCase(asyncsignup.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })
    }

})

export const { loginStart } = authSlice.actions;

export default authSlice.reducer;