import React, { createContext, FC, useCallback, useContext, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { User } from '../types/User';

export const AuthContext = createContext<{
  user: User | null;
  saveToken: (token: string) => void;
  removeToken: () => void;
  setProfile: (user: User) => void;
  logout: () => void;
} | null>(null);

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useAuth must be used within an AuthProvider');
  return auth;
};

export const AuthProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [, setToken] = useLocalStorage<string | null>('token', null);
  const [user, setUser] = useState<User | null>(null);

  const saveToken = useCallback(
    (token: string) => {
      setToken(token);
    },
    [setToken],
  );

  const setProfile = useCallback((user: User) => {
    setUser(user);
  }, []);

  const removeToken = useCallback(() => {
    setToken(null);
  }, [setToken]);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [removeToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        saveToken,
        removeToken,
        setProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
