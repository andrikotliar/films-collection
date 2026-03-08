import z from 'zod';

export const UploadFilePayloadSchema = z.object({
  key: z.string(),
  fileType: z.string(),
});

export const UploadFileResponseSchema = z.object({
  url: z.string(),
});
