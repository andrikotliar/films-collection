import { env } from '~/common';
import { FilesService } from '~/modules/files/files.service';

export const files = new FilesService(env);
