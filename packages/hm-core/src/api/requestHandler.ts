import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { setLoading } from '../store/slices/uiSlice';
import { store } from '../store/store';

export const api = Axios.create();

api.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    store.dispatch(setLoading({ module: 'ui', loading: true }));
    const token = Cookies.get('access_token');
    //set Authorization header
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    store.dispatch(setLoading({ module: 'ui', loading: false }));

    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  function (response) {
    store.dispatch(setLoading({ module: 'ui', loading: false }));
    return response;
  },
  function (error) {
    store.dispatch(setLoading({ module: 'ui', loading: false }));
    return Promise.reject(error);
  },
);

export const request = {
  get: <T>(endpoint: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.get(endpoint, options);
  },
  post: <T>(endpoint: string, data: unknown, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    if (options?.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
      return api.post(endpoint, data, options);
    }
    return api.post(endpoint, Object.assign({}, data), options);
  },
  put: (endpoint: string, data: unknown, options?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return api.put(endpoint, data, options);
  },
  patch: (endpoint: string, options?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return api.patch(endpoint, options);
  },
  delete: (endpoint: string, options?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return api.delete(endpoint, options);
  },
  options: (endpoint: string, options?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return api.options(endpoint, options);
  },

  head: (endpoint: string, options?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return api.head(endpoint, options);
  },
};
