import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

export const getComments = createAsyncThunk(
    "comments/getComments",
    async(_, thunkAPI) => {
        try {
            const response = await fetch("http://localhost:3001/comments")
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const addReview = createAsyncThunk(
    "review/addReview",
    async ({ star, review, id }, thunkAPI) => {
      try {
        const response = await fetch(
          `http://localhost:3001/review/playground/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            //   Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
            },
            body: JSON.stringify({ star, review }),
          }
        );
        const data = await response.json();
        // if (data.error) {
        //   toast.error(data.error);
        //   return thunkAPI.rejectWithValue(data.error);
        // }
        return thunkAPI.fulfillWithValue(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  const commentsSlice = createSlice({
    name: "comments",
    initialState: {
      loading: false,
      error: null,
      success: false,
      comments: ['review1','review2','review3'],
    },
    reducers: {},
    extraReducers: (builder) => {
      builder

        .addCase(addReview.pending, (state) => {
          state.loading = true;
        })
        .addCase(addReview.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
        })
        .addCase(addReview.fulfilled, (state, action) => {
          state.playgrounds = state.comments.map((item) => {
            if (item._id === action.payload._id) {
              return action.payload;
            }
            return item;
          });
          state.loading = false;
          state.error = null;
        })
        .addCase(getComments.fulfilled, (state, action) => {
            state.comments = action.payload
            state.loading = false
            state.error = null
        })
        .addCase(getComments, (state, action)=> {
            state.loading = true
        })
        .addCase(getComments.rejected, (state, action)=> {
            state.loading = true
            state.error = state.action
        })
  
    },
  });
  
  export default commentsSlice.reducer;