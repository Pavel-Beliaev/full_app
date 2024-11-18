import React, { ReactNode } from 'react';
import { Control, FieldValues, useController, Path } from 'react-hook-form';
import { Input } from '@nextui-org/react';

type PropsType<T extends FieldValues> = {
  name: Path<T>
  label: string
  placeholder?: string
  type?: string
  control: Control<T>
  required?: string
  endContent?: ReactNode
  disabled?: boolean
}

export const MyInput = <T extends FieldValues>({
                                                 name,
                                                 label,
                                                 placeholder,
                                                 type,
                                                 control,
                                                 required = '',
                                                 disabled = false,
                                                 endContent,
                                               }: PropsType<T>) => {
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
      endContent={endContent}
    />
  );
};