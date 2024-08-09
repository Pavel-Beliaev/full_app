import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage, MyInput } from '@/components';
import { Button, Link } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { hasErrorField } from '@/utils/hasErrorField';
import { useLazyCurrentQuery, useLoginMutation } from '@/store/services';

type LoginType = {
  email: string
  password: string
}

type PropsType = {
  // eslint-disable-next-line no-unused-vars
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

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      await login(data).unwrap();
      await triggerCurrentQuery().unwrap();
      navigate('/');
      if (error) {
        setError('');
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message);
      }
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
      <ErrorMessage error={error} />
      <p className='text-center text-small'>
        Don't have an account?&nbsp;&nbsp;
        <Link
          size='sm'
          className=' cursor-pointer'
          onPress={() => setSelected('sign-up')}
        >
          Create an account.
        </Link>
      </p>
      <div
        className=' flex gap-2 justify-end'
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