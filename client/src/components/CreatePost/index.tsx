import React from 'react';
import { useCreatePostMutation, useLazyGetAllPostsQuery } from '@/store/services';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Post } from '@/store/types';
import { Button, Textarea } from '@nextui-org/react';
import { ErrorMessage } from '@/components';
import { IoMdCreate } from 'react-icons/io';

type PostType = {
  post: string
}

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const [triggerAllPosts] = useLazyGetAllPostsQuery();

  const {
    handleSubmit,
    control,
    formState: {
      errors,
    },
    setValue,
  } = useForm<PostType>();

  const error = errors?.post?.message as string;

  const onSubmit: SubmitHandler<PostType> = async (data) => {
    try {
      await createPost({ content: data.post }).unwrap();
      setValue('post', '');
      await triggerAllPosts().unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className='flex-grow' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='post'
        control={control}
        defaultValue=''
        rules={{
          required: 'Fields must be filled',
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement='outside'
            placeholder='Write the text'
            className='mb-5'
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color='success'
        className=''
        endContent={<IoMdCreate />}
        type='submit'
      >
        Add post
      </Button>
    </form>
  );
};