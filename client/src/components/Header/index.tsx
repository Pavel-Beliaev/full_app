import React, { useContext } from 'react';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { FaRegMoon } from 'react-icons/fa';
import { LuSunMedium } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { clearState, selectIsAuthenticated } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { api, useLogoutMutation } from '@/store/services';
import { CiLogout } from 'react-icons/ci';
import { ThemeContext } from '@/context';

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isAuth = useSelector(selectIsAuthenticated);
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
      <NavbarBrand>
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