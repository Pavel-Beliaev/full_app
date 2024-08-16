import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '@/store/services';
import { BackButton, Comments, CreateForm, Post } from '@/components';

export const CurrentPost = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetPostByIdQuery(params.id);

  if (!data) {
    return <h2>Post not found!</h2>;
  }

  const {
    author,
    content,
    likes,
    comments,
    id,
    likeByUser,
    createdAt,
  } = data;

  return (
    <>
      <BackButton />
      <Post
        name={author.name ?? ''}
        authorId={author.id}
        avatarUrl={author.avatarUrl ?? ''}
        id={id}
        content={content}
        createAt={createdAt}
        likesCount={likes.length}
        commentsCount={comments.length}
        cardFor='current'
        likedByUser={likeByUser}
      />
      <div className='mt-10'>
        <CreateForm type='comment'/>
      </div>
      <div className='mt-10'>
        {data.comments
          ? <Comments data={data}/>
          : null
        }
      </div>
    </>
  );
};