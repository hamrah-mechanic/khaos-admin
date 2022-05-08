import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { authenticate, logout } from '../auth/authUtilities';
import Cookies from 'js-cookie';

interface AxiosOptions extends AxiosRequestConfig {
  isAuthenticated?: boolean;
}
const api = Axios.create();

api.interceptors.request.use(function (config: any) {
  const token = Cookies.get('access_token');
  //set Authorization header
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      return renewAccessToken().then((newToken: any) => {
        if (newToken) {
          authenticate({ refreshToken: newToken.refresh_token, accessToken: newToken.access_token });
          error.config.headers['Authorization'] = `Bearer ${newToken.access_token}`;
          return api.request(error.config);
        } else {
          logout();
          return;
        }
      });
    }
    return Promise.reject(error);
  },
);

// api.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error: any) {
//     if (error.response && error.response.status === 401) {
//       store.dispatch(setError({ type: '401', message: 'token invalid' }));
//       const token = Cookies.get('access_token');
//       error.config.headers['Authorization'] = `Bearer ${token}`;
//       return api.request(error.config);
//     }
//     return Promise.reject(error);
//   },
// );

const request = {
  get: <T>(endpoint: string, options?: AxiosOptions): Promise<AxiosResponse<T>> => {
    return api.get(endpoint, options);
  },
  post: <T>(endpoint: string, data: unknown, options?: AxiosOptions): Promise<AxiosResponse<T>> => {
    if (options?.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
      return api.post(endpoint, data, options);
    }
    return api.post(endpoint, Object.assign({}, data), options);
  },
  put: (endpoint: string, data: unknown, options?: AxiosOptions): Promise<AxiosResponse> => {
    return api.put(endpoint, data, options);
  },
  patch: (endpoint: string, options?: AxiosOptions): Promise<AxiosResponse> => {
    return api.patch(endpoint, options);
  },
  delete: (endpoint: string, options?: AxiosOptions): Promise<AxiosResponse> => {
    return api.delete(endpoint, options);
  },
  options: (endpoint: string, options?: AxiosOptions): Promise<AxiosResponse> => {
    return api.options(endpoint, options);
  },

  head: (endpoint: string, options?: AxiosOptions): Promise<AxiosResponse> => {
    return api.head(endpoint, options);
  },
};

export default { request, api };

//This shall be removed later
const renewAccessToken = async (): Promise<any> => {
  const params = new URLSearchParams();
  const token = Cookies.get('refresh_token') as string;
  params.append('client_id', 'backoffice');
  params.append('grant_type', 'refresh_token');
  params.append('client_secret', 'secret');
  params.append('scope', 'offline_access');
  params.append('refresh_token', token);
  const data = await request.post('https://dev.hamrah-mechanic.com/api/v1/membership/connect/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return data.data;
};
