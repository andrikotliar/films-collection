import { z } from 'zod';

export const DeviceInfoSchema = z.object({
  browser: z
    .object({
      name: z.string(),
      version: z.string(),
    })
    .partial(),
  device: z
    .object({
      model: z.string(),
      vendor: z.string(),
      type: z.string(),
    })
    .partial(),
  os: z
    .object({
      name: z.string(),
      version: z.string(),
    })
    .partial(),
});

export const UserSessionSchema = z.object({
  id: z.number(),
  deviceInfo: DeviceInfoSchema.nullable(),
  lastActivityAt: z.string().nullable(),
  isCurrent: z.boolean(),
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

export const UpdateUserTranslationPreferencesSchema = z.object({
  from: z.string(),
  to: z.string(),
});

export const UserDataResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  translationPreferences: UpdateUserTranslationPreferencesSchema.nullable(),
});

export type DeviceInfo = z.infer<typeof DeviceInfoSchema>;
export type UserSessionResponse = z.infer<typeof UserSessionSchema>;
export type UpdateUserPasswordInput = z.infer<typeof UpdateUserPasswordInputSchema>;
export type UpdateUserTranslationPreferences = z.infer<
  typeof UpdateUserTranslationPreferencesSchema
>;
