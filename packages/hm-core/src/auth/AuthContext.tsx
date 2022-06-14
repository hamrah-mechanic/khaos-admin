import React, { createContext, ReactElement, useState } from 'react';
import { authenticate, extractUserFromCookie, removeAuthTokens } from './authUtilities';
import WithAxios from '../api/WithAxios';

//TYPES
import { User, TokenType } from '../types';
//FIXME: whats tokens type
interface AuthContextProps {
  user: User;
  login: (tokens) => void;
  loginRequest: (username: string, password: string) => void;
  refreshRequest: () => Promise<any>;
}
interface AuthProviderProps {
  loginRequest: (username: string, password: string) => void;
  refreshRequest: () => Promise<any>;
  children: ReactElement;
}

export const AuthContext = createContext<AuthContextProps>({
  user: { fullName: '' },
  login: () => null,
  loginRequest: () => null,
  refreshRequest: () => null,
});

const AuthProvider = ({ children, loginRequest, refreshRequest }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(() => extractUserFromCookie());

  const login = async (tokens: TokenType) => {
    authenticate({ refreshToken: tokens.refresh_token, accessToken: tokens.access_token });
    const extractedUser = extractUserFromCookie();
    setUser(extractedUser);
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
        loginRequest,
        refreshRequest,
      }}
    >
      <WithAxios>{children}</WithAxios>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
