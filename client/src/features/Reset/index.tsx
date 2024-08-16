import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage, MyInput } from '@/components';
import { Button, Link } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { hasErrorField } from '@/utils/hasErrorField';
import { useLazyCurrentQuery, useLoginMutation, useResetPasswordMutation } from '@/store/services';

type ResetType = {
  email: string
}

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setSelected: (value: 'login' | 'sign-up' | 'recovery' | 'reset') => void
}

export const Reset: FC<PropsType> = ({ setSelected }) => {
  const { handleSubmit, control } =
    useForm<ResetType>({
      mode: 'onChange',
      reValidateMode: 'onBlur',
      defaultValues: {
        email: '',
      },
    });
  const [reset, { isLoading }] = useResetPasswordMutation();
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<ResetType> = async (data) => {
    try {
      await reset(data).unwrap();
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
    <form
      className='flex flex-col gap-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className='text-medium'>
        {`To reset your password, enter your email address associated with your account. 
        An email will be sent to you to reset your password`}
      </p>
      <MyInput
        name='email'
        label='Email...'
        type='email'
        control={control} />
      <ErrorMessage error={error} />
      <div className=' flex gap-2 justify-end'>
        <Button
          fullWidth
          color='primary'
          type='submit'
          isLoading={isLoading}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};