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
      invalidatesTags: ['Like'],
    }),

    unLikePost: build.mutation<
      void,
      string
    >({
      query: (id) => ({
        url: `/likes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Like'],
    }),
  }),
});

export const {
  useLikePostMutation,
  useUnLikePostMutation,
} = likesApi;