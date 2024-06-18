import { api } from './api';

export const UserApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),

    register: build.mutation<
      { email: string; password: string; name: string },
      { email: string; password: string; name: string }
    >({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});
