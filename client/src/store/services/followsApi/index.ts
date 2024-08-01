import { api } from '@/store/services';

export const followsApi = api.injectEndpoints({
  endpoints: (build) => ({
    followUser: build.mutation<
      void,
      { followingId: string }
    >({
      query: (body) => ({
        url: '/follow',
        method: 'POST',
        body,
      }),
    }),

    unFollowUser: build.mutation<
      void,
      string
    >({
      query: (id) => ({
        url: `/follow/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnFollowUserMutation,
} = followsApi;

export const {
  endpoints: { followUser, unFollowUser },
} = followsApi;