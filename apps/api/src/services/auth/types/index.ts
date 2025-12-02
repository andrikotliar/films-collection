type TokenKey = 'accessToken' | 'refreshToken';

export type AuthTokens = {
  [key in TokenKey]: string;
};

export type VerifiedTokenData = {
  id: number;
  iat: number;
  exp: number;
};
