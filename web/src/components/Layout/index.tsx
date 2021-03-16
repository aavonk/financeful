import React, { useEffect } from 'react';
import Appbar from '@Components/Layout/Appbar';
import Sidebar from '@Components/Layout/Sidebar';
import PageContainer from '@Components/Layout/PageContainer';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import { useSidebar } from '@Context/sidebar/sidebarContext';

function Layout({ children }: { children: React.ReactNode }) {
  const {
    state: { isOpen },
    dispatch,
  } = useSidebar();
  const tabletAndDown = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (tabletAndDown && isOpen) {
      dispatch({ type: 'CLOSE' });
    }
  }, [tabletAndDown]);

  return (
    <>
      <Appbar />
      <Sidebar />
      <PageContainer drawerOpen={isOpen}>{children}</PageContainer>
    </>
  );
}

export default Layout;
