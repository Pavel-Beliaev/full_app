import { Likes } from '@/store/types';
import { api } from '@/store/services';

export const likesApi = api.injectEndpoints({
  endpoints: (build) => ({
    likePost: build.mutation<
      Likes,
      { postId: string }
    >({
      query: (body) => ({
        url: '/likes',
        method: 'POST',
        body
      }),
    }),

    unLikePost: build.mutation<
      void,
      string
    >({
      query: (id) => ({
        url: `/likes/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLikePostMutation,
  useUnLikePostMutation,
} = likesApi;

export const {
  endpoints: { likePost, unLikePost },
} = likesApi;