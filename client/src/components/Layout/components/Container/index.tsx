import React, { FC, ReactElement } from 'react';

type PropsType = {
  children: ReactElement[] | ReactElement;
}

export const Container: FC<PropsType> = ({ children }) => {
  return (
    <div className='flex max-w-screen-xl mx-auto mt-10'>
      {children}
    </div>
  );
};