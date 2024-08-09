import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/store/types';
import { usersApi } from '@/store/services';
import { RootState } from '@/store/store';

interface IUserSlice {
  user: User | null;
  isAuthenticated: boolean;
  users: User[] | null;
  current: User | null;
  token?: string;
}

const initialState: IUserSlice = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: () => initialState,
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(usersApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addMatcher(usersApi.endpoints.current.matchFulfilled, (state, action) => {
        state.current = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(usersApi.endpoints.getUserById.matchFulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { resetUser, clearState } = userSlice.actions;
export default userSlice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectCurrent = (state: RootState) => state.user.current;
export const selectUser = (state: RootState) => state.user.user;
