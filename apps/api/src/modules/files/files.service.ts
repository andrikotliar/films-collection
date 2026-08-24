import type { UploadFilePayloadSchema } from '@films-collection/shared';
import type z from 'zod';
import type { Inject } from '~/shared/types/inject.js';

export class FilesService {
  constructor(private readonly deps: Inject<'StorageService'>) {}

  getUploadUrl(payload: z.infer<typeof UploadFilePayloadSchema>) {
    return this.deps.StorageService.getUploadUrl(payload);
  }
}
