import { Post } from '@/store/types';
import { api } from '@/store/services';

export const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation<
      Post,
      { content: string }
    >({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
    }),

    getAllPosts: build.query<
      Post[],
      void
    >({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
      providesTags: ['Post', 'Like', 'Comment'],
    }),

    getPostById: build.query<
      Post,
      string
    >({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
      providesTags: ['Like', 'Comment'],
    }),

    deletePost: build.mutation<
      void,
      string
    >({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} = postsApi;