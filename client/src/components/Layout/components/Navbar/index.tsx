import React from 'react';
import { BsPostcard } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { NavButton } from '@/components/Layout/components';

export const Navbar = () => {
  return (
    <nav>
      <ul className='flex flex-col gap-5'>
        <li>
          <NavButton href='/' icon={<BsPostcard />}>
            Posts
          </NavButton>
        </li>
        <li>
          <NavButton href='following' icon={<FiUsers />}>
            Following
          </NavButton>
        </li>
        <li>
          <NavButton href='followers' icon={<FaUsers />}>
            Followers
          </NavButton>
        </li>
      </ul>
    </nav>
  );
};