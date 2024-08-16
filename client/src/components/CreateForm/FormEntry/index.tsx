import React, { FC } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { Button, Textarea } from '@nextui-org/react';
import { ErrorMessage } from '@/components';
import { IoMdCreate } from 'react-icons/io';

type PropsType = {
  onSubmit: () => void
  name: string
  control: Control
  placeholder: string
  isError: boolean
  error: string
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  textButton: string
}

export const FormEntry: FC<PropsType> = ({
                                           onSubmit,
                                           name,
                                           control,
                                           placeholder,
                                           isError,
                                           error,
                                           color,
                                           textButton
                                         }) => {
  return (
    <form className='flex-grow' onSubmit={onSubmit}>
      <Controller
        name={name}
        control={control}
        defaultValue=''
        rules={{
          required: 'Fields must be filled',
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement='outside'
            placeholder={placeholder}
            className='mb-5'
          />
        )}
      />
      {isError && <ErrorMessage error={error} />}
      <Button
        color={color}
        className='flex-end'
        endContent={<IoMdCreate />}
        type='submit'
      >
        {textButton}
      </Button>
    </form>
  );
};