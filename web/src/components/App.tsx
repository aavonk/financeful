import * as React from 'react';
import Routes from '../routes';
import { AuthProvider } from '@Context/auth/authContext';

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
