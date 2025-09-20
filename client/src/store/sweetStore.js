import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sweetService from "@/api/sweetService";

const initialState = {
    sweets: [],
    loading: false,
    error: null,
};

// Async Thunks

// Fetch all sweets
export const fetchSweets = createAsyncThunk(
    "sweets/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await sweetService.getAllSweets();
            return response.data.sweets; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to fetch sweets");
        }
    }
);

// Search sweets
export const searchSweets = createAsyncThunk(
    "sweets/search",
    async (filters, thunkAPI) => {
        try {
            const response = await sweetService.searchSweets(filters);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Search failed");
        }
    }
);

// Add a sweet (Admin only)
export const addSweet = createAsyncThunk(
    "sweets/add",
    async (sweetData, thunkAPI) => {
        try {
            const response = await sweetService.addSweet(sweetData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Add sweet failed");
        }
    }
);

// Update a sweet (Admin only)
export const updateSweet = createAsyncThunk(
    "sweets/update",
    async ({ id, updatedData }, thunkAPI) => {
        try {
            const response = await sweetService.updateSweet(id, updatedData);
            return { id, data: response.data };
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Update sweet failed");
        }
    }
);

// Delete a sweet (Admin only)
export const deleteSweet = createAsyncThunk(
    "sweets/delete",
    async (id, thunkAPI) => {
        try {
            await sweetService.deleteSweet(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Delete sweet failed");
        }
    }
);

// Purchase sweet
export const purchaseSweet = createAsyncThunk(
    "sweets/purchase",
    async ({ id, quantity }, thunkAPI) => {
        try {
            const response = await sweetService.purchaseSweet(id, quantity);
            return { id, data: response.data };
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Purchase failed");
        }
    }
);

// Restock sweet (Admin only)
export const restockSweet = createAsyncThunk(
    "sweets/restock",
    async ({ id, quantity }, thunkAPI) => {
        try {
            const response = await sweetService.restockSweet(id, quantity);
            return { id, data: response.data };
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Restock failed");
        }
    }
);

// Slice
const sweetSlice = createSlice({
    name: "sweets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchSweets
            .addCase(fetchSweets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSweets.fulfilled, (state, action) => {
                state.loading = false;
                state.sweets = action.payload;
            })
            .addCase(fetchSweets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // searchSweets
            .addCase(searchSweets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchSweets.fulfilled, (state, action) => {
                state.loading = false;
                state.sweets = action.payload;
            })
            .addCase(searchSweets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // addSweet
            .addCase(addSweet.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(addSweet.fulfilled, (state, action) => {
                state.loading = false;
                state.sweets.push(action.payload);
            })
            .addCase(addSweet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // updateSweet
            .addCase(updateSweet.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(updateSweet.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.sweets.findIndex(s => s._id === action.payload.id);
                if (index !== -1) state.sweets[index] = { ...state.sweets[index], ...action.payload.data };
            })
            .addCase(updateSweet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // deleteSweet
            .addCase(deleteSweet.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(deleteSweet.fulfilled, (state, action) => {
                state.loading = false;
                state.sweets = state.sweets.filter(s => s._id !== action.payload);
            })
            .addCase(deleteSweet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // purchaseSweet
            .addCase(purchaseSweet.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(purchaseSweet.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.sweets.findIndex(s => s._id === action.payload.id);
                if (index !== -1) state.sweets[index] = { ...state.sweets[index], ...action.payload.data };
            })
            .addCase(purchaseSweet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // restockSweet
            .addCase(restockSweet.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(restockSweet.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.sweets.findIndex(s => s._id === action.payload.id);
                if (index !== -1) state.sweets[index] = { ...state.sweets[index], ...action.payload.data };
            })
            .addCase(restockSweet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default sweetSlice.reducer;