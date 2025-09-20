import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "@/api/authServices"
import { StorageKeys } from "@/utils/constant";

const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
console.log(token)
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    isAuthenticated: !!token
}


// create async thunk function

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userdata, thunkAPI) => {
        try {
            const response = await authService.register(userdata);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Something went wrong"
            );
        }
    }
);


export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, thunkAPI) => {
        try {
            const response = await authService.login(credentials);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Invalid credentials");
        }
    })


export const getCurrentUser = createAsyncThunk(
    "auth/current-user",
    async (_, thunkAPI) => {
        try {
            const response = await authService.getCurrentUser();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const response = await authService.logout();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Logout failed");
        }
    });


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user; 
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = !!action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            });
    }
})

export default authSlice.reducer