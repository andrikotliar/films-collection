import type { UploadFilePayloadSchema } from '@films-collection/shared';
import type z from 'zod';
import type { Deps } from '~/shared/types/dependencies.js';

export class FilesService {
  constructor(private readonly deps: Deps<'StorageService'>) {}

  getUploadUrl(payload: z.infer<typeof UploadFilePayloadSchema>) {
    return this.deps.StorageService.getUploadUrl(payload);
  }
}
