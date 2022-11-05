import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
immovablesList:[],
loading: true,
error: null
};
export const immovablesFetch = createAsyncThunk(
    "immovables/option",
    async (filter, thunkAPI) => {
      try {
        const res = await fetch("http://localhost:3001/immovables/", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({filter}),
          });
        const data = await res.json();
        if (data.error) {
          return thunkAPI.rejectWithValue(data.error);
        }
        return data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );
export const immovablesSlice = createSlice({
  name: "immovables",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(immovablesFetch.pending, (state, action) => {
        state.loading=true
    }).addCase(immovablesFetch.rejected, (state, action) => {
        state.loading=false
        state.error = action.payload.error
    }).addCase(immovablesFetch.fulfilled, (state, action) => {
        state.loading=false
        state.immovablesList = action.payload 
    })
  },
});
export default immovablesSlice.reducer;
