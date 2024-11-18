import React, { useContext } from 'react';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { FaGlobeAsia, FaRegMoon } from 'react-icons/fa';
import { LuSunMedium } from 'react-icons/lu';
import { clearState, selectIsAuthenticated } from '@/store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { api, useLogoutMutation } from '@/store/services';
import { CiLogout } from 'react-icons/ci';
import { ThemeContext } from '@/context';

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isAuth = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    dispatch(clearState());
    dispatch(api.util.resetApiState());
    logout();
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <Navbar>
      <NavbarBrand className='gap-3'>
        <FaGlobeAsia className='w-7 h-7'/>
        <p className='font-bold text-inherit'>
          Network Social
        </p>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem
          className='lg:flex text-3xl cursor-pointer'
          onClick={() => toggleTheme()}
        >
          {theme === 'light'
            ? <FaRegMoon />
            : <LuSunMedium />
          }
        </NavbarItem>
        <NavbarItem>
          {
            isAuth && (
              <Button
                color='default'
                variant='flat'
                className='gap-2'
                onClick={handleLogout}
              >
                <CiLogout /> <span>Log out</span>
              </Button>
            )
          }
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};