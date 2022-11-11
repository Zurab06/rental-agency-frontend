import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: localStorage.getItem("token"),
  favorites: [],
  loading: false,
  nickname: false,
  order: [],
  error: false,
  signIn: false,
  signUp: false,
};

export const signUpUser = createAsyncThunk(
  "user/post",
  async ({ login, password, nickname }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, login, password }),
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
export const signInUser = createAsyncThunk(
  "user/fetch",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3001/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }
      localStorage.setItem("token", data.token);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const getInfoAboutUser = createAsyncThunk(
  "userInfo/fetch",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
      const res = await fetch("http://localhost:3001/users/info", {
        method: "get",
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
export const addFavorite = createAsyncThunk(
  "user/patch",
  async (favorite, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    try {
      const res = await fetch("http://localhost:3001/users/favorites", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ favorite }),
      });
      const data = res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state, action) => {
        state.loading = true;
        state.signUp = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.signUp = false;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.signUp = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.error = false;
        state.signUp = true;
        state.token = action.payload.token;
        state.favorites = action.payload.favorites;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.error = true;
        localStorage.removeItem("token");
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.error = true;
      })
      .addCase(addFavorite.pending, (state, action) => {})
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload.favorites;
      })
      .addCase(getInfoAboutUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getInfoAboutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getInfoAboutUser.fulfilled, (state, action) => {
        state.nickname = action.payload.nickname;
        state.order = action.payload.order;
        state.loading = false;
      });
  },
});
export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
