import React, { createContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authenticate, extractUserFromCookie, removeAuthTokens } from './authUtilities';
import WithAxios from '../api/WithAxios';
//FIXME: correct types instead any
export const AuthContext = createContext<any>({});

const AuthProvider = props => {
  const { children, loginRequest, refreshRequest } = props;
  const [user, setUser] = useState<User | undefined>(() => extractUserFromCookie());
  const login = async tokens => {
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
