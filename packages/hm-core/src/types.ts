export interface User {
  fullName?: string;
}
export interface TokenType {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: 'api offline_access openid profile' | string;
  token_type: 'Bearer';
}
