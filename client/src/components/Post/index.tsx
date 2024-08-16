import React, { FC, memo, useState } from 'react';
import { Card } from '@nextui-org/react';
import { ErrorMessage } from '@/components';
import { PostBody } from './PostBody';
import { PostFooter } from './PostFooter';
import { PostHeader } from './PostHeader';

type PropsType = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  likesCount?: number
  commentsCount?: number
  createAt?: Date
  id?: string
  cardFor: 'comment' | 'post' | 'current'
  likedByUser?: boolean
}

export const Post: FC<PropsType> = memo(({
                                           name = '',
                                           authorId = '',
                                           avatarUrl = '',
                                           id = '',
                                           content = '',
                                           createAt,
                                           likesCount = 0,
                                           commentsCount = 0,
                                           cardFor = 'post',
                                           likedByUser = false,
                                         }) => {

  const [error, setError] = useState('');

  return (
    <Card className='mb-5'>
      <PostHeader
        authorId={authorId}
        avatarUrl={avatarUrl}
        name={name}
        createAt={createAt}
        cardFor={cardFor}
        id={id}
        setError={setError}
      />
      <PostBody content={content} />
      {cardFor !== 'comment' &&
        <PostFooter
          likesCount={likesCount}
          likedByUser={likedByUser}
          id={id}
          commentsCount={commentsCount}
          setError={setError}
        />
      }
      <ErrorMessage error={error} />
    </Card>
  );
});