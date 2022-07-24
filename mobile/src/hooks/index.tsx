import React from 'react';
import {AuthProvider} from './auth';

// @ts-ignore
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
