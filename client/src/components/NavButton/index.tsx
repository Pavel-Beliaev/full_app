import React, { FC, ReactNode } from 'react';
import { MyButton } from '@/components';
import { Link } from 'react-router-dom';

type PropsType = {
  children: ReactNode;
  icon: JSX.Element
  href: string;
}

export const NavButton: FC<PropsType> = ({
                                           children,
                                           icon,
                                           href,
                                         }) => {
  return (
    <MyButton
      className='flex justify-start text-xl'
      icon={icon}
    >
      <Link to={href}>
        {children}
      </Link>
    </MyButton>
  );
};

