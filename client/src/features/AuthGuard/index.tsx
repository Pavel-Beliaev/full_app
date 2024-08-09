import React, { FC, ReactElement } from 'react';
import { useCurrentQuery } from '@/store/services';
import { Spinner } from '@nextui-org/react';
import { skipToken } from '@reduxjs/toolkit/query';

type PropsType = {
  children: ReactElement;
}

export const AuthGuard: FC<PropsType> = ({ children }) => {

  const requestSkipHandler = () => {
    if (localStorage.getItem('token')) {
      return 1;
    }
    return null;
  };

  const { isLoading } = useCurrentQuery(requestSkipHandler() ?? skipToken);


  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return children;
};