import React from 'react';
import { Container, Header, Navbar } from '@/components';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Header/>
      <Container>
        <div className='flex-2 p-4'>
          <Navbar/>
        </div>
        <div className='flex-1 p-4'>
          <Outlet/>
        </div>
      </Container>
    </>
  );
};