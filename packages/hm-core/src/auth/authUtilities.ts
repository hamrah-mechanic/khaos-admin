import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import { User } from '../types';

export const authenticate = (tokens: { refreshToken: string; accessToken: string }, expiration?: number): boolean => {
  const { accessToken, refreshToken } = tokens;
  try {
    if (expiration) {
      Cookies.set('token', accessToken, { expires: expiration });
      Cookies.set('refreshToken', refreshToken, { expires: 1000 });
      return true;
    }
    Cookies.set('token', accessToken);
    Cookies.set('refreshToken', refreshToken);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const logout = (): void => {
  try {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
  } catch (err) {
    console.error(err);
  }
};

export const removeAuthTokens = (): void => {
  try {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
  } catch (err) {
    console.error(err);
  }
};

export const extractUserFromCookie = (token?: string): User | null => {
  try {
    const accessToken = Cookies.get('token');
    if (accessToken) {
      const user = jwt(accessToken) as User;
      return user;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
  return null;
};
