import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { Button } from '@nextui-org/react';

export const BackButton: FC = memo(() => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate(-1);
  };

  return (
    <Button
      className='text-default-500 text-medium flex justify-start gap-2 mb-10 bg-transparent p-0 min-w-0'
      onClick={handleButton}
    >
      <FaRegArrowAltCircleLeft />
      Back
    </Button>
  );
});