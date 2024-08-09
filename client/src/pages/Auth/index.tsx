import React, { useState } from 'react';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { Login, Register } from '@/features';

export const Auth = () => {
  const [selected, setSelected] = useState<'login' | 'sign-up'>('login');

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col'>
        <Card className='h-[450px] w-[340px]'>
          <CardBody className='overflow-hidden'>
            <Tabs
              fullWidth
              size='md'
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key as typeof selected)}
            >
              <Tab key='login' title='Enter'>
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key='sign-up' title='Registration'>
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};