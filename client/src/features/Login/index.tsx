import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MyInput } from '@/components';
import { Button, Link } from '@nextui-org/react';
import { useLazyCurrentQuery, useLoginMutation } from '@/store/services/usersApi';
import { useNavigate } from 'react-router-dom';

type LoginType = {
  email: string
  password: string
}

type PropsType = {
  setSelected: (value: 'login' | 'sign-up') => void
}

export const Login: FC<PropsType> = ({ setSelected }) => {
  const { handleSubmit, control } = useForm<LoginType>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [login, { isLoading }] = useLoginMutation();
  const [triggerCurrentQuery] = useLazyCurrentQuery();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data: LoginType) => {
    try {
      await login(data).unwrap();
    } catch (error) {

    }
  };

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <MyInput
        name='email'
        label='Email'
        type='email'
        required='Fields must be filled'
        control={control} />
      <MyInput
        name='password'
        label='Password'
        type='password'
        required='Fields must be filled'
        control={control} />
      <p className='text-center text-small'>
        Do you have an account?&nbsp;&nbsp;
        <Link
          size='sm'
          className='cursor-pointer'
          onPress={() => setSelected('sign-up')}
        >
          Create an account
        </Link>
      </p>
      <div
        className='flex gap-2 justify-end'
      >
        <Button
          fullWidth
          color='primary'
          type='submit'
          isLoading={isLoading}
        >
          Enter
        </Button>
      </div>
    </form>
  );
};