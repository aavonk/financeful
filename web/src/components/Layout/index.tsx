import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Appbar from '@Components/Layout/Appbar';
import Sidebar from '@Components/Layout/Sidebar';
import PageContainer from '@Components/Layout/PageContainer';
import { useMediaQuery } from '@Hooks/useMediaQuery';

function Layout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const tabletAndDown = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (tabletAndDown && drawerOpen) {
      setDrawerOpen(!drawerOpen);
    }
  }, [tabletAndDown]);

  return (
    <>
      <Appbar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
      <Sidebar drawerOpen={drawerOpen} />
      <PageContainer drawerOpen={drawerOpen}>{children}</PageContainer>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
