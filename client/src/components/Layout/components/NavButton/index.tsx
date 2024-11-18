import React, { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

type PropsType = {
  children: ReactNode
  icon: ReactNode
  href: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  color?:
    'default' |
    'primary' |
    'secondary' |
    'success' |
    'warning' |
    'danger'
}

export const NavButton: FC<PropsType> = ({
                                           children,
                                           icon,
                                           href,
                                           type,
                                           fullWidth,
                                           color,
                                         }) => {

  const navigate = useNavigate();

  return (
    <Button
      startContent={icon}
      size='lg'
      color={color}
      variant='light'
      className='flex justify-start text-xl'
      type={type}
      fullWidth={fullWidth}
      onClick={() => navigate(href)}
    >
      {children}
    </Button>
  );
};

