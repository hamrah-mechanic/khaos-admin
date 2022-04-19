import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { logout } from '../auth/authUtilities';

interface AxiosOptions extends AxiosRequestConfig {
  isAuthenticated?: boolean;
}
const api = Axios.create();

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // return refreshAccessToken().then(newToken => {
      //   if (newToken) {
      //     error.config.headers['Authorization'] = `Bearer ${newToken}`;
      //     return api.request(error.config);
      //   } else {
      //     logout();
      //     return;
      //   }
      // });
    }
    return Promise.reject(error);
  },
);


const request = {
  get: <T>(endpoint: string, options?: AxiosOptions): Promise<AxiosResponse<T>> => {
    return api.get(endpoint, options);
  },
  post: <T>(endpoint: string, data: unknown, options?: AxiosOptions): Promise<AxiosResponse<T>> => {

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

export default request;

