import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  offerList: [],
  allOfferList: [],
  loading: true,
  error: null,
  lastDate: "",
};
export const fetchUserOffer = createAsyncThunk(
  "offer/fetch",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
      const res = await fetch(`http://localhost:3001/offers/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
export const fetchLastOffer = createAsyncThunk(
  "offer/last/fetch",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
      const res = await fetch(`http://localhost:3001/offers/last/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
export const fetchAllOffer = createAsyncThunk(
  "offerall/fetch",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
      const res = await fetch(`http://localhost:3001/offers/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
export const addUserOffer = createAsyncThunk(
  "offer/post",
  async ({ start, end, id }, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
      const res = await fetch(`http://localhost:3001/offers/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ start, end }),
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
export const confirmUserOffer = createAsyncThunk(
  "offer/patch",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
      const res = await fetch(`http://localhost:3001/offers/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
export const removeUserOffer = createAsyncThunk(
  "offer/remove",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
      const res = await fetch(`http://localhost:3001/offers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
  name: "offer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserOffer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addUserOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUserOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offerList = action.payload;
      })
      .addCase(fetchUserOffer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offerList = action.payload;
      })
      .addCase(confirmUserOffer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(confirmUserOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(confirmUserOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offerList = action.payload;
      })
      .addCase(removeUserOffer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeUserOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeUserOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offerList = action.payload;
      })
      .addCase(fetchAllOffer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.allOfferList = action.payload;
      })
      .addCase(fetchLastOffer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchLastOffer.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchLastOffer.fulfilled, (state, action) => {
        if (action.payload[0]) {
          const date = moment(action.payload[0].end).format(`YYYY-MM-DD`);
          state.lastDate = date;
        } else {
          const date = moment().add(1, "days").format(`YYYY-MM-DD`);
          state.lastDate = date;
        }
        state.loading = false;
      });
  },
});
export default immovablesSlice.reducer;
