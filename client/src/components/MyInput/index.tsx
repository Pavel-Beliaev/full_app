import React, { FC } from 'react';
import { Control, useController } from 'react-hook-form';
import { Input } from '@nextui-org/react';

type PropsType = {
  name: string
  label: string
  placeholder?: string
  type?: string
  control: Control<any>
  required?: string
  endContent?: JSX.Element
}

export const MyInput: FC<PropsType> = ({
                                         name,
                                         label,
                                         placeholder,
                                         type,
                                         control,
                                         required = '',
                                         endContent,
                                       }) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  });
  return (
    <Input
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ''}`}
    />
  );
};