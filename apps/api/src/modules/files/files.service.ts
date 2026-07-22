import { type Deps } from '~/shared/index.js';
import type { UploadFilePayloadSchema } from '@films-collection/shared';
import type z from 'zod';

export class FilesService {
  constructor(private readonly deps: Deps<'storageService'>) {}

  getUploadUrl(payload: z.infer<typeof UploadFilePayloadSchema>) {
    return this.deps.storageService.getUploadUrl(payload);
  }
}
