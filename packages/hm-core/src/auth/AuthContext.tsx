import React, { createContext, useState, useEffect } from 'react';
import errorSlice from '../store/slices/errorSlice';
import { User } from '../types';
import { authenticate, extractUserFromCookie, removeAuthTokens } from './authUtilities';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '../store/store';

interface AuthContextType {
  user?: User | undefined;
  login: (tokens: { refreshToken: string; accessToken: string }) => void;
  logout?: (cb?: () => void) => void;
}
export const AuthContext = createContext<AuthContextType>({ login: () => console.log('loggedIn') });

const AuthProvider = (props: any) => {
  const { children } = props;
  // console.log(
  //   'error is ',
  //   useSelector((state: RootState) => state.error),
  // );
  // console.log(useSelector(state => state));

  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    const extractedUser = extractUserFromCookie() as User;
    console.log(extractUserFromCookie());
    if (user) setUser(extractedUser);
  }, []);

  const login = (tokens: { refreshToken: string; accessToken: string }) => {
    console.log('login', tokens);
    authenticate(tokens);
    // setUser({});
  };
  const logout = (): void => {
    setUser(undefined);
    removeAuthTokens();
  };
  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          user: user,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </Provider>
  );
};
export default AuthProvider;
