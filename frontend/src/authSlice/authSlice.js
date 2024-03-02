import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
// import axios from "axios"
import httpClient from '../httpClient';


// async login calls
export const asyncLogin = createAsyncThunk('authSlice/asyncLogin', async (credentials, { rejectWithValue }) => {
    try {
        //const res = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/user/login`, credentials);
        const res = await httpClient.post(`${import.meta.env.VITE_API_SERVER_URL}/user/login`, credentials);
        return res.data;
    } catch (error) {
        console.log(error.message)
        return rejectWithValue(error.response.data);
    }
}
)

// async signup call

export const asyncSingup = createAsyncThunk('authSlice/asyncSingup', async (credentials, { rejectWithValue }) => {
    try {
        //const res = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/user/login`, credentials);
        const res = await httpClient.post(`${import.meta.env.VITE_API_SERVER_URL}/user/signup`, credentials);
        return res.data;
    } catch (error) {
        console.log(error.message)
        return rejectWithValue(error.response.data);
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
        loginerror: null,
        signuperror: null,
        success: false,
        username: null
    },
    reducers: {
        loginStart: (state) => {
            state.isLogin = true;
        },
        logoutStart: (state) => {
            state.isLogin = false;
        },
        updateuser: (state, action) => {
            console.log(action.payload,"2331")
            state.username = action.payload.name;
        }


    },

    // login reducer

    extraReducers: (builder) => {
        builder.addCase(asyncLogin.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(asyncLogin.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status == 'success') {
                state.userToken = action.payload.token;
                localStorage.setItem("accessToken", action.payload.token)
                localStorage.setItem("userinfo", JSON.stringify(action.payload.user))
                state.isLogin = true;
                state.username = action.payload.user.name;
            }
        })
        builder.addCase(asyncLogin.rejected, (state, action) => {
            state.loading = false;
            state.loginerror = action.payload.message
        })


        // signup reducer


        builder.addCase(asyncSingup.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(asyncSingup.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status == 201) {
                state.userToken = action.payload.token;
                localStorage.setItem("accessToken", action.payload.token)
                state.username = action.payload.user.name;
                state.isLogin = true;
            }
        })
        builder.addCase(asyncSingup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;

        })

    }
})

export const { loginStart, logoutStart ,updateuser } = authSlice.actions

export default authSlice.reducer