import { Comments } from '@/store/types';
import { api } from '@/store/services';

export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation<
      Comments,
      Partial<Comments>
    >({
      query: (body) => ({
        url: '/comments',
        method: 'POST',
        body
      }),
    }),

    deleteComment: build.mutation<
      void,
      string
    >({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;

export const {
  endpoints: { createComment, deleteComment },
} = commentsApi;