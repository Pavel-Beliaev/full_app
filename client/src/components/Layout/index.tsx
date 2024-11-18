import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectAble, selectIsAuthenticated } from '@/store/slices/userSlice';
import { Container, Header, Navbar, Profile } from '@/components/Layout/components';
import { useAppSelector } from '@/store/hooks';

export const Layout = () => {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const isAble = useAppSelector(selectAble);
  const navigate = useNavigate();

  useEffect(() => {

    if (!isAuth) {
      navigate('/auth');
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className='flex-2 p-4'>
          <Navbar />
        </div>
        <div className='flex-1 p-4'>
          <Outlet />
        </div>
        <div className='flex-2 p-4'>
          <div className='flex-col flex gap-5'>
            {!isAble && <Profile />}
          </div>
        </div>
      </Container>
    </>
  );
};