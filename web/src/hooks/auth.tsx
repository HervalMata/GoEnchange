import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface Props {
  children: any;
}

const AuthContext = createContext<AuthContextData>( {} as AuthContextData);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoExchange:token');
    const user = localStorage.getItem('@GoExchange:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  // @ts-ignore
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email, password
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoExchange:token', token);
    localStorage.setItem('@GoExchange:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoExchange:token');
    localStorage.removeItem('@GoExchange:user');

    setData({} as AuthState);
  },
    [],
  );


  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be use within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
