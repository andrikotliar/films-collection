import { env } from 'src/common';
import { FilesService } from 'src/modules/files/files.service';

export const files = new FilesService(env);
