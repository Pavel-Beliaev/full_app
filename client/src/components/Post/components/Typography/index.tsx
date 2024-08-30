import React, { FC } from 'react';

type PropsType = {
  children: string
  size?: string
}

export const Typography: FC<PropsType> = ({ children, size = 'text-xl' }) => {
  return (
    <p className={`${size}`}>
      {children}
    </p>
  );
};