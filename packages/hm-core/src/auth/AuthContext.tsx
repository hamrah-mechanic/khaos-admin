import React, { createContext, ReactElement, useState } from 'react';
import { authenticate, extractUserFromCookie, removeAuthTokens } from './authUtilities';
import WithAxios from '../api/WithAxios';

//TYPES
import { User, TokenType } from '../types';
//FIXME: whats tokens type
interface AuthContextProps {
  user: User | null;
  login?: (tokens: TokenType) => void;
  loginRequest?: (username: string, password: string) => Promise<TokenType>;
  refreshRequest?: () => Promise<TokenType>;
}
interface AuthProviderProps {
  loginRequest?: (username: string, password: string) => Promise<TokenType>;
  refreshRequest?: () => Promise<TokenType>;
  children: ReactElement;
}

export const AuthContext = createContext<AuthContextProps>({
  user: { fullName: '' },
  login: () => null,
  loginRequest: () => Promise.resolve({ access_token: '', refresh_token: '' }),
  refreshRequest: () => Promise.resolve({ access_token: '', refresh_token: '' }),
});

const AuthProvider = ({ children, loginRequest, refreshRequest }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => extractUserFromCookie());

  const login = async (tokens: TokenType) => {
    authenticate({ refreshToken: tokens.refresh_token, accessToken: tokens.access_token });
    const extractedUser = extractUserFromCookie();
    setUser(extractedUser);
  };

  const logout = (): void => {
    setUser(null);
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
