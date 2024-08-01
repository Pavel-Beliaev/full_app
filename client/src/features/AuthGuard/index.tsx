import React, { FC } from 'react';
import { useCurrentQuery } from '@/store/services';
import { Spinner } from '@nextui-org/react';

type PropsType = {
  children: JSX.Element;
}

export const AuthGuard: FC<PropsType> = ({ children }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return children;
};