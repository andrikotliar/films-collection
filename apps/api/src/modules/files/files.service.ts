import type { UploadFilePayloadSchema } from '@films-collection/shared';
import type z from 'zod';
import type { Deps } from '~/shared/types/deps.js';

export class FilesService {
  constructor(private readonly deps: Deps<'storageService'>) {}

  getUploadUrl(payload: z.infer<typeof UploadFilePayloadSchema>) {
    return this.deps.storageService.getUploadUrl(payload);
  }
}
