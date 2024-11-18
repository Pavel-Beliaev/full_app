import React, { ChangeEvent, FC, memo, useContext, useState } from 'react';
import { User } from '@/store/types';
import { ThemeContext } from '@/context';
import { useUpdateUserMutation } from '@/store/services';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from '@nextui-org/react';
import { ErrorMessage, MyInput } from '@/components';
import { MdOutlineEmail } from 'react-icons/md';
import { hasErrorField } from '@/utils/hasErrorField';

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  user?: User
}

export const EditProfile: FC<PropsType> = memo(({
                                                  isOpen,
                                                  onClose,
                                                  user,
                                                }) => {
  const { theme } = useContext(ThemeContext);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();
  const { handleSubmit, control } =
    useForm<User>({
      mode: 'onChange',
      reValidateMode: 'onBlur',
      defaultValues: {
        email: user.email,
        name: user.name,
        dateOfBirth: user.dateOfBirth,
        bio: user.bio,
        location: user.location,
      },
    });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onSubmit = async (data: User) => {
    try {
      const formData = new FormData();
      data.name && formData.append('name', data.name);
      data.email && data.email !== user.email && formData.append('email', data.email);
      data.dateOfBirth && formData.append('dateOfBirth', new Date(data.dateOfBirth)
        .toString());
      data.bio && formData.append('bio', data.bio);
      data.location && formData.append('location', data.location);
      selectedFile && formData.append('avatar', selectedFile);
      await updateUser({ userData: formData, id }).unwrap();
      onClose();
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.message);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground`}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Edit profile
            </ModalHeader>
            <ModalBody>
              <form
                className='flex flex-col gap-4'
                onSubmit={handleSubmit(onSubmit)}
              >
                <MyInput
                  disabled
                  name='email'
                  label='Email'
                  type='email'
                  control={control}
                  endContent={<MdOutlineEmail />}
                />
                <MyInput
                  name='name'
                  label='Name'
                  type='text'
                  control={control}
                />
                <input
                  type='file'
                  name='avatarUrl'
                  onChange={handleFileChange}
                />
                <MyInput
                  name='dateOfBirth'
                  label='Date of Birth'
                  type='date'
                  placeholder='dd/mm/yyyy'
                  control={control}
                />
                <Controller
                  name='bio'
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder='Biographical info'
                    />
                  )}
                />
                <MyInput
                  name='location'
                  label='Location'
                  type='text'
                  control={control}
                />
                <ErrorMessage error={error} />
                <div className='flex gap-2 justify-end'>
                  <Button
                    fullWidth
                    color='primary'
                    type='submit'
                    isLoading={isLoading}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});