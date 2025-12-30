import z from 'zod';

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const LogoutResponseSchema = z.object({
  status: z.enum(['ok']),
});

export type LoginInput = z.infer<typeof LoginSchema>;
