import React, { FC, useState } from 'react';
import { ErrorMessage, MyInput } from '@/components';
import { Button, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { hasErrorField } from '@/utils/hasErrorField';
import { useRegisterMutation } from '@/store/services';

type RegisterType = {
  email: string
  password: string
  name: string
}

type PropsType = {
  setSelected: (value: 'login' | 'sign-up') => void
}

export const Register: FC<PropsType> = ({ setSelected }) => {
  const { handleSubmit, control } = useForm<RegisterType>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState('');

  const onSubmit = async (data: RegisterType) => {
    try {
      await register(data).unwrap();
      setSelected('login');
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
      <MyInput
        name='name'
        label='Name'
        type='text'
        required='Fields must be filled'
        control={control} />
      <ErrorMessage error={error}/>
      <p className='text-center text-small'>
        Already have an account?&nbsp;&nbsp;
        <Link
          size='sm'
          className='cursor-pointer'
          onPress={() => setSelected('login')}
        >
          Log in.
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
          Registration
        </Button>
      </div>
    </form>
  );
};