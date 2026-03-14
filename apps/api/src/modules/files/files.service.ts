import { type Deps } from '~/shared';
import type { UploadFilePayloadSchema } from '@films-collection/shared';
import type z from 'zod';

export class FilesService {
  constructor(private readonly deps: Deps<'awsService'>) {}

  getUploadUrl(payload: z.infer<typeof UploadFilePayloadSchema>) {
    return this.deps.awsService.getUploadUrl(payload);
  }
}
