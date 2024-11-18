import React, { FC, memo } from 'react';

type PropsType = {
  error: string
}

export const ErrorMessage: FC<PropsType> = memo(({ error = '' }) => {
  return error && <p className='text-red-500 mt-2 mb-5 text-small'>{error}</p>;
});