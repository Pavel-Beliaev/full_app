import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated, selectUser } from '@/store/slices/userSlice';
import { useSelector } from 'react-redux';
import { Container, Header, Navbar, Profile } from '@/components/Layout/components';

export const Layout = () => {
  const isAuth = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
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
            {!user && <Profile />}
          </div>
        </div>
      </Container>
    </>
  );
};