export const ResponseCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHENTICATED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

export type ResponseStatus = keyof typeof ResponseCode;
