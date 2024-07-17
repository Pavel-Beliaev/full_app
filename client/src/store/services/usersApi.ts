import { api } from './api';
import { User } from '../types';

type Token = { accessToken: string; refreshToken: string }

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<
      { status: string },
      { email: string; password: string; name: string }
    >({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),

    login: build.mutation<
      Token,
      { email: string; password: string }
    >({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),

    current: build.query<User & Token, void>({
      query: () => ({
        url: '/current',
        method: 'GET',
      }),
    }),

    getUserById: build.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),

    logout: build.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),

    updateUser: build.mutation<User, { userData: FormData, id: string }>({
      query: ({ userData, id }) => ({
        url: `/edit/user/${id}`,
        method: 'PUT',
        body: userData,
      }),
    }),

    refresh: build.query({
      query: () => ({
        url: '/refresh',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useLogoutMutation,
  useUpdateUserMutation,
  useLazyRefreshQuery,
} = usersApi;

export const {
  endpoints: { login, logout, updateUser, getUserById, register, current, refresh },
} = usersApi;