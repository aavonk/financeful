import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Appbar from '@Components/Layout/Appbar';
import Sidebar from '@Components/Layout/Sidebar';
import PageContainer from '@Components/Layout/PageContainer';
import { useMediaQuery } from '@Hooks/useMediaQuery';

function Layout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const tabletAndDown = useMediaQuery('(max-width: 768px)');

  // When loging out, the component will try to set the state
  // on an unmounted component which causes a memory leak.
  // useEffect will return the cleanup function when the component
  // unmounts before it calls the effect, allowing the effect to
  // be skipped after the component has unmounted.

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (tabletAndDown && drawerOpen) {
        setDrawerOpen(!drawerOpen);
      }
    }

    return () => {
      isMounted = false;
    };
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
