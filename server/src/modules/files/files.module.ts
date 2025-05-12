import { createModule, env } from 'src/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

export const FilesModule = createModule({
  prefix: 'files',
  service: () => {
    const service = new FilesService(env);
    return service;
  },
  controller: FilesController,
});
