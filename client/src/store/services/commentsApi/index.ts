import { Comments } from '@/store/types';
import { api } from '@/store/services';

export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation<
      Comments,
      {content: string, postId: string}
    >({
      query: (body) => ({
        url: '/comments',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Comment'],
    }),

    deleteComment: build.mutation<
      void,
      string
    >({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;