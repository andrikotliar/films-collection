type TokenKey = 'accessToken' | 'refreshToken';

export type AuthTokens = {
  [key in TokenKey]: string;
};

export type VerifiedTokenData = {
  id: number;
  iat: number;
  ext: number;
};

export type VerificationResultSuccess = {
  status: 'success';
  data: VerifiedTokenData;
  token: string;
};

export type VerificationResultError = {
  status: 'error';
  errorType: 'expired' | 'unauthorized';
};

export type VerificationResult = VerificationResultSuccess | VerificationResultError;

export type AuthTokensResponse = {
  id: number;
  newTokens: AuthTokens | null;
};
