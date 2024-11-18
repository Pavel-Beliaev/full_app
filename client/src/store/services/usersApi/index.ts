import { User, Token } from '@/store/types';
import { api } from '@/store/services';


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

    current: build.query<User & Token, number | void>({
      query: () => ({
        url: '/current',
        method: 'GET',
      }),
      providesTags: ['Follow', 'Edit'],
    }),

    getUserById: build.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['Follow', 'Edit'],
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
      invalidatesTags: ['Edit'],
    }),

    resetPassword: build.mutation<void, { email: string }>({
      query: (email) => ({
        url: `/reset`,
        method: 'POST',
        body: email,
      }),
    }),

    recoveryPassword: build.mutation<void, { hash: string, password: string }>({
      query: (data) => ({
        url: `/change_password`,
        method: 'POST',
        body: data,
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
  useLogoutMutation,
  useUpdateUserMutation,
  useResetPasswordMutation,
  useRecoveryPasswordMutation,
} = usersApi;