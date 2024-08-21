import React, { FC } from 'react';
import { FormEntry } from '@/components/CreateForm/FormEntry';
import { useParams } from 'react-router-dom';
import {
  useCreateCommentMutation,
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '@/store/services';
import { SubmitHandler, useForm } from 'react-hook-form';

type PropsType = {
  type: 'post' | 'comment'
}

type FormType<T extends PropsType['type']> = {
  // eslint-disable-next-line no-unused-vars
  [key in T as string]: string
}

export const CreateForm: FC<PropsType> = ({ type }) => {
  const { id } = useParams();
  const [createComment] = useCreateCommentMutation();
  const [getPostById] = useLazyGetPostByIdQuery();
  const [createPost] = useCreatePostMutation();
  const [triggerAllPosts] = useLazyGetAllPostsQuery();
  const isPost = type === 'post';

  const {
    handleSubmit,
    control,
    formState: {
      errors,
    },
    setValue,
  } = useForm<FormType<typeof type>>();

  const error = errors?.post?.message as string
    || errors?.comment?.message as string;

  const onSubmit: SubmitHandler<FormType<typeof type>> = async (data) => {
    try {
      if (!isPost && id) {
        await createComment({ content: data.comment, postId: id }).unwrap();
        setValue('comment', '');
        await getPostById(id).unwrap();
      } else {
        await createPost({ content: data.post }).unwrap();
        setValue('post', '');
        await triggerAllPosts().unwrap();
      }
    } catch (error) {
      throw new Error('Invalid form');
    }
  };

  return (
    <FormEntry
      onSubmit={handleSubmit(onSubmit)}
      name={isPost ? 'post' : 'comment'}
      control={control}
      placeholder={isPost ? 'Write a post...' : 'Write a comment...'}
      isError={!!errors}
      error={error}
      color={isPost ? 'success' : 'primary'}
      textButton={isPost ? 'Post' : 'Comment'}
    />
  );
};