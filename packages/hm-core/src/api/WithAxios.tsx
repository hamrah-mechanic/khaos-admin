import React, { useContext, useMemo } from 'react';
import { authenticate, logout } from '../auth/authUtilities';
import { AuthContext } from '../auth/AuthContext';
import { api } from './requestHandler';

//TYPES
import { TokenType } from '../types';

interface Props {
  children: JSX.Element;
}

const WithAxios = ({ children }: Props): JSX.Element => {
  const { refreshRequest } = useContext(AuthContext);

  useMemo(() => {
    api.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response && error.response.status === 401) {
          return refreshRequest()
            .then((newToken: TokenType) => {
              const { refresh_token, access_token } = newToken;
              authenticate({ refreshToken: refresh_token, accessToken: access_token });
              if (newToken.access_token) {
                error.config.headers['Authorization'] = `Bearer ${access_token}`;
                return api.request(error.config);
              }
            })
            .catch(() => logout());
        }
        return Promise.reject(error);
      },
    );
  }, []);

  return children;
};

export default WithAxios;
