import { requestHandler } from 'hm-core';
const { request } = requestHandler;
import Cookies from 'js-cookie';

export const loginRequest = async (username: string, password: string) => {
  const params = new URLSearchParams();
  params.append('client_id', 'backoffice');
  params.append('grant_type', 'password');
  params.append('client_secret', 'secret');
  params.append('scope', 'offline_access api profile openid');
  params.append('username', username);
  params.append('password', password);
  const data = await request.post('https://dev.hamrah-mechanic.com/api/v1/membership/connect/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return data.data;
};

//FIXME: correct types instead of `any`
export const renewAccessToken = async (): Promise<any> => {
  const params = new URLSearchParams();
  const refreshToken = Cookies.get('refresh_token') as string;
  params.append('client_id', 'backoffice');
  params.append('grant_type', 'refresh_token');
  params.append('client_secret', 'secret');
  params.append('scope', 'offline_access');
  params.append('refresh_token', refreshToken);
  const data = await request.post<any>('https://dev.hamrah-mechanic.com/api/v1/membership/connect/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return data;
};

//returns true if token has been refreshed
// export const refreshAccessToken = async (): Promise<string> => {
//   const refreshToken = Cookies.get('refresh_token') as string;
//   const { refresh_token, access_token, expires_in } = await renewAccessToken(refreshToken);
//   if (access_token) {
//     authenticate({ refreshToken: refresh_token, accessToken: access_token }, expires_in / (24 * 60 * 60));
//   }
//   return access_token;
// };
