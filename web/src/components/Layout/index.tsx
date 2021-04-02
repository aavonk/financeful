import React, { useEffect, useState } from 'react';
import Appbar from '@Components/Layout/Appbar';
import Sidebar from '@Components/Layout/Sidebar';
import PageContainer from '@Components/Layout/PageContainer';
import { useMediaQuery } from '@Hooks/useMediaQuery';

function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const tabletAndDown = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (tabletAndDown && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [tabletAndDown]);

  return (
    <>
      <Appbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <PageContainer isSidebarOpen={isSidebarOpen}>{children}</PageContainer>
    </>
  );
}

export default Layout;
