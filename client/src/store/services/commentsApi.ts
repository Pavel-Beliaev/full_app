import { api } from './api';
import { Comments } from '../types';

export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation<
      Comments,
      { postId: string, content: string }
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