import z from 'zod';

export const DeviceInfoSchema = z.object({
  os: z.string(),
  browser: z.string(),
});

export const UserSessionSchema = z.object({
  id: z.number(),
  deviceInfo: DeviceInfoSchema.nullable(),
  lastActivityAt: z.string().nullable(),
});

export const UpdateUserPasswordInputSchema = z.object({
  actualPassword: z.string().min(8),
  newPassword: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      'Password should be at least 8 character long, contain at least one uppercase letter, at least one number and at least one special character',
    ),
});

export type DeviceInfo = z.infer<typeof DeviceInfoSchema>;
export type UserSession = z.infer<typeof UserSessionSchema>;
export type UpdateUserPasswordInput = z.infer<typeof UpdateUserPasswordInputSchema>;
