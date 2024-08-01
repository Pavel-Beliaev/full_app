import React, { FC } from 'react';

type PropsType = {
  error: string
}

export const ErrorMessage: FC<PropsType> = ({ error = '' }) => {
  return error && <p className='text-red-500 mt-2 mb-5 text-small'>{error}</p>;
};