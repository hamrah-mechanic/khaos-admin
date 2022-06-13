import React, { useContext, useMemo } from 'react';
import { authenticate, logout } from '../auth/authUtilities';
import { AuthContext } from '../auth/AuthContext';
import { api } from './requestHandler';

//TYPES
import { TokenType } from '../types';

interface DataTokenType {
  data: TokenType;
}

const WithAxios = ({ children }) => {
  const { refreshRequest } = useContext(AuthContext);

  useMemo(() => {
    api.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response && error.response.status === 401) {
          return refreshRequest()
            .then((newToken: DataTokenType) => {
              const {
                data: { refresh_token, access_token },
              } = newToken;
              authenticate({ refreshToken: refresh_token, accessToken: access_token });
              if (newToken.data.access_token) {
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
