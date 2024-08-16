import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage, MyInput } from '@/components';
import { Button, Link } from '@nextui-org/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { hasErrorField } from '@/utils/hasErrorField';
import { useRecoveryPasswordMutation } from '@/store/services';

type RecoveryType = {
  password: string
  confirm: string
}
export const Recovery: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { handleSubmit, control } =
    useForm<RecoveryType>({
      mode: 'onChange',
      reValidateMode: 'onBlur',
      defaultValues: {
        password: '',
        confirm: '',
      },
    });
  const [recovery, { isLoading }] = useRecoveryPasswordMutation();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RecoveryType> = async (data) => {
    const hash = searchParams.get('hash');
    try {
      if (data.confirm === data.password) {
        await recovery({ hash, password: data.password }).unwrap();
        navigate('/');
      } else {
        setError('Passwords do not match');
      }
      if (error) {
        setError('');
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message);
      }
    }
  };

  useEffect(() => {
    return () => {
      setSearchParams({})
    }
  }, []);

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <MyInput
        name='password'
        label='Password'
        type='password'
        required='Fields must be filled'
        control={control} />
      <MyInput
        name='confirm'
        label='Confirm password'
        type='password'
        required='Fields must be filled'
        control={control} />
      <ErrorMessage error={error} />
      <div
        className=' flex gap-2 justify-end'
      >
        <Button
          fullWidth
          color='primary'
          type='submit'
          isLoading={isLoading}
        >
          Recovery
        </Button>
      </div>
    </form>
  );
};