import Cookies from 'js-cookie';
import jwt from 'jwt-decode';

//TYPES
import { User } from '../types';

export const authenticate = (tokens: { refreshToken: string; accessToken: string }, expiration?: number): boolean => {
  const { accessToken, refreshToken } = tokens;
  try {
    if (expiration) {
      Cookies.set('access_token', accessToken, { expires: expiration });
      Cookies.set('refresh_token', refreshToken, { expires: 1000 });
      return true;
    }
    Cookies.set('access_token', accessToken);
    Cookies.set('refresh_token', refreshToken);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const logout = (): void => {
  try {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  } catch (err) {
    console.error(err);
  }
};

export const removeAuthTokens = (): void => {
  try {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  } catch (err) {
    console.error(err);
  }
};

export const extractUserFromCookie = (): User | null => {
  try {
    const accessToken = Cookies.get('access_token');
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
