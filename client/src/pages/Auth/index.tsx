import React, { useState } from 'react';
import { Button, Tab, Tabs } from '@nextui-org/react';
import { Login, Recovery, Register, Reset } from '@/features';
import { CardMain } from '@/components';

const Auth = () => {
  const [selected, setSelected] = useState<'login' | 'sign-up' | 'recovery' | 'reset'>('login');

  return (
    <CardMain setSelected={setSelected}>
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
        {selected === 'reset' &&
          <Tab key='reset' title='Reset'>
            <Reset setSelected={setSelected} />
          </Tab>
        }
        {selected === 'recovery' &&
          <Tab key='recovery' title='Recovery'>
            <Recovery />
          </Tab>
        }
      </Tabs>
      {selected === 'login' && (
        <Button
          fullWidth
          color='default'
          type='button'
          onClick={() => setSelected('reset')}
        >
          Forgot password?
        </Button>
      )}
    </CardMain>
  );
};

export default Auth;