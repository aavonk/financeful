import React from 'react';
import Appbar from '@Components/Layout/Appbar';
import Sidebar from '@Components/Layout/Sidebar';
import PageContainer from '@Components/Layout/PageContainer';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Appbar />
      <Sidebar />
      <PageContainer>{children}</PageContainer>
    </>
  );
}

export default Layout;
