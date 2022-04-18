import Cookies from 'js-cookie';
import jwt from 'jwt-decode';

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

export const isAuthenticated = (): string => {
  try {
    return Cookies.get('token');
  } catch (err) {
    console.error(err);
  }
};

export const logout = (): void => {
  try {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    Cookies.remove('resendToken');
  } catch (err) {
    console.error(err);
  }
};

export const extractUserFromCookie = (token?: string): User | null => {
  if (token) {
    const user = jwt(token) as User;
    return user;
  }
  const accessToken = Cookies.get('token');
  if (accessToken && accessToken !== 'undefined') {
    const user = jwt(accessToken) as User;
    return user;
  }
  return null;
};