import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';

export const BackButton: FC = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate(-1);
  };

  return (
    <div
      className='text-default-500 flex items-center gap-2 mb-10 cursor-pointer'
      onClick={handleButton}
    >
      <FaRegArrowAltCircleLeft />
      Back
    </div>
  );
};