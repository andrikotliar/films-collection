import z from 'zod';

export const DeviceInfoSchema = z.object({
  os: z.string(),
  browser: z.string(),
});

export const UserSchema = z.object({
  deviceInfo: DeviceInfoSchema,
});

export type DeviceInfo = z.infer<typeof DeviceInfoSchema>;
export type User = z.infer<typeof UserSchema>;
