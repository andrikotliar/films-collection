import z from 'zod';

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const LogoutResponseSchema = z.object({
  status: z.enum(['ok']),
});

export const AuthStateResponseSchema = z.object({
  isAuthenticated: z.boolean(),
});

export type LoginInput = z.infer<typeof LoginSchema>;
