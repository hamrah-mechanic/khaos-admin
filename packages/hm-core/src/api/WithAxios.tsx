import React, { useContext, useMemo } from 'react';
import { authenticate, logout } from '../auth/authUtilities';
import { AuthContext } from '../auth/AuthContext';
import { api } from './requestHandler';

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
            .then((newToken: any) => {
              authenticate({ refreshToken: newToken.data.refresh_token, accessToken: newToken.data.access_token });
              if (newToken.data.access_token) {
                error.config.headers['Authorization'] = `Bearer ${newToken.data.access_token}`;
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
