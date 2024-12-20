import React, { FC, memo } from 'react';

type PropsType = {
  title: string
  info?: string
}

export const ProfileInfo: FC<PropsType> = memo(({ title, info }) => {

  if (!info) {
    return null;
  }

  return (
    <p className='font-semibold'>
      <span className='text-gray-500 mr-2'>{title}</span>
      {info}
    </p>
  );
});