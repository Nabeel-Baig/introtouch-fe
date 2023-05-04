import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, getPublicUserProfile } from "../../services";

const initialState = {
  user: null,
  publicUser:null
};

const getUser = createAsyncThunk(
  "userSlice/getUser",
  async () => { 
    return getUserProfile();;
  }
);

const getPublicUser = createAsyncThunk(
  "userSlice/getPublicUser",
  async (userId) => { 
    return getPublicUserProfile(userId);;
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    }).addCase(getPublicUser.fulfilled, (state, { payload }) => {
      state.publicUser = payload;
    })
  },
});

const userReducer = userSlice.reducer;

export { getUser,getPublicUser, userReducer };
