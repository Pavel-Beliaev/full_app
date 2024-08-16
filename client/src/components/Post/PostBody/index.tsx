import React, { FC, memo } from 'react';
import { CardBody } from '@nextui-org/react';
import { Typography } from '@/components';

type PropsType = {
  content: string
}

export const PostBody: FC<PropsType> = memo(({content}) => {
  return (
    <CardBody className='px-3 py-2 mb-5'>
      <Typography>{content}</Typography>
    </CardBody>
  );
});