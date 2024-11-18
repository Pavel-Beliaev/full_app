import { createSlice } from '@reduxjs/toolkit';
import { NewUserType, User } from '@/store/types';
import { usersApi } from '@/store/services';
import { RootState } from '@/store/store';
import { followAdapter } from '@/store/adapter/followAdapter';

interface IUserSlice {
  user: User | null;
  isAuthenticated: boolean;
  users: User[] | null;
  current: NewUserType | null;
  token?: string;
  isAble: boolean;
}

const initialState: IUserSlice = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
  isAble: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: () => initialState,
    resetUser: (state) => {
      state.user = null;
    },
    disabler: (state) => {
      state.isAble = !state.isAble;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(usersApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addMatcher(usersApi.endpoints.current.matchFulfilled, (state, action) => {
        state.current = followAdapter(action.payload);
        state.isAuthenticated = true;
      })
      .addMatcher(usersApi.endpoints.getUserById.matchFulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { resetUser, clearState, disabler } = userSlice.actions;
export default userSlice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectCurrent = (state: RootState) => state.user.current;
export const selectUser = (state: RootState) => state.user.user;
export const selectAble = (state: RootState) => state.user.isAble;
