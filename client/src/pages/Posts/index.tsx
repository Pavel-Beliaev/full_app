import React from 'react';
import { CreateForm, Post } from '@/components';
import { useGetAllPostsQuery } from '@/store/services';

export const Posts = () => {
  const { data } = useGetAllPostsQuery();


  return (
    <>
      <div className='mb-10 w-full'>
        <CreateForm type='post' />
      </div>
      {data && data.length > 0
        ? data.map(({
                      id,
                      content,
                      author,
                      createdAt,
                      likes,
                      comments,
                      likeByUser,
                    }) => (
          <Post
            key={id}
            id={id}
            content={content}
            name={author.name ?? ''}
            authorId={author.id}
            avatarUrl={author.avatarUrl ?? ''}
            createAt={createdAt}
            likesCount={likes.length}
            commentsCount={comments.length}
            likedByUser={likeByUser}
            cardFor='post'
          />
        ))
        : null
      }
    </>
  );
};