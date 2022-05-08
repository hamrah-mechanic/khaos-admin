import React, { createContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authenticate, extractUserFromCookie, removeAuthTokens } from './authUtilities';
import { useSelector } from 'react-redux';
import { store, RootState } from '../store/store';
import { setError } from '../store/slices/errorSlice';

interface AuthContextType {
  user?: User | undefined;
}

export const AuthContext = createContext<any>({});

const AuthProvider = (props: any) => {
  const { children, refreshAccess, dataProvider } = props;
  const error = useSelector((state: RootState) => state.error);
  const [user, setUser] = useState<User | undefined>(() => extractUserFromCookie());

  useEffect(() => {
    if (error?.type === '401') {
      onUnAuthorized();
      store.dispatch(setError({ type: '', message: '' }));
    }
  }, [error]);

  const login = async (tokens: any) => {
    authenticate({ refreshToken: tokens.refresh_token, accessToken: tokens.access_token });
    const extractedUser = extractUserFromCookie() as User;
    setUser(extractedUser);
  };

  const onUnAuthorized = async () => {
    const newTokens = await refreshAccess();
    authenticate({ refreshToken: newTokens.refresh_token, accessToken: newTokens.access_token });
  };

  const logout = (): void => {
    setUser(undefined);
    removeAuthTokens();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login,
        dataProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
