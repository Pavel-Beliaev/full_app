import React, { FC, memo, useEffect, useLayoutEffect } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { useSearchParams } from 'react-router-dom';

type PropsType = {
  children: React.ReactNode
  // eslint-disable-next-line no-unused-vars
  setSelected: (value: 'login' | 'sign-up' | 'recovery' | 'reset') => void
}

export const CardMain: FC<PropsType> = memo(({ children, setSelected }) => {
  const [params] = useSearchParams();
  const select = params.get('value') as 'login' | 'sign-up' | 'recovery' | 'reset';

  useLayoutEffect(() => {
    if (select !== null) {
      setSelected(select);
    }
  }, []);

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col'>
        <Card className='h-[450px] w-[340px]'>
          <CardBody className='overflow-hidden'>
            {children}
          </CardBody>
        </Card>
      </div>
    </div>
  );
});