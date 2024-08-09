import React, { FC } from 'react';
import { BASE_URL } from '@/constants';
import { User } from '@nextui-org/react';

type PropsType = {
  name: string
  avatarUrl: string
  description?: string
  className?: string
}

export const CardUser: FC<PropsType> = ({
                                          name = '',
                                          avatarUrl = '',
                                          description = '',
                                          className = '',
                                        }) => {
  return (
    <User
      name={name}
      className={className}
      description={description}
      avatarProps={{
        src: `${BASE_URL}${avatarUrl}`,
      }}
    />
  );
};