import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { AsyncStorage } from "react-native";

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
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface Props {
  children: any;
}

const AuthContext = createContext<AuthContextData>( {} as AuthContextData);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [[, token], [, user]] = await AsyncStorage.multiGet([
        '@GoExchange:token',
        '@GoExchange:user'
      ]);

      if (token && user) {
        setData({ token, user: JSON.parse(user) });
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);


  // @ts-ignore
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email, password
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoExchange:token', token],
      ['@GoExchange:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoExchange:token', '@GoExchange:user']);

    setData({} as AuthState);
  },
    [],
  );

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
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
