import React, { FC } from 'react';
import { Post } from '@/components';
import { Post as PostType } from '@/store/types';

type PropsType = {
  data: PostType
}

export const Comments: FC<PropsType> = ({data}) => {
  return (
    <>
      {data.comments.map(({
                            id,
                            content,
                            user,
                            createdAt,
                          }) => (
        <Post
          key={id}
          name={user.name ?? ''}
          authorId={user.id}
          avatarUrl={user.avatarUrl ?? ''}
          id={id}
          content={content}
          createAt={createdAt}
          cardFor='comment'
        />
      ))}
    </>
  );
};