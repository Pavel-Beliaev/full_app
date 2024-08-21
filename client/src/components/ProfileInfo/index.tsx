import React, { FC } from 'react';

type PropsType = {
  title: string
  info?: string
}

export const ProfileInfo: FC<PropsType> = ({ title, info }) => {

  if (!info) {
    return null;
  }

  return (
    <p className='font-semibold'>
      <span className='text-gray-500 mr-2'>{title}</span>
      {info}
    </p>
  );
};