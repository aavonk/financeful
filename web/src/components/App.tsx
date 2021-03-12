import * as React from 'react';
import Routes from '../routes';
import AuthProvider from '@Context/auth/AuthProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App;
