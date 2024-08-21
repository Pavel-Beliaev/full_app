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
  disabled?: boolean
}

export const MyInput: FC<PropsType> = ({
                                         name,
                                         label,
                                         placeholder,
                                         type,
                                         control,
                                         required = '',
                                         endContent,
                                         disabled = false
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
      disabled={disabled}
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