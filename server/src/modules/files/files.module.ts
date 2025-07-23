import { createModule, env } from 'src/common';
import { createFilesRouter } from './files.router';
import { FilesService } from './files.service';

export const FilesModule = createModule({
  prefix: 'files',
  service: () => {
    const service = new FilesService(env);
    return service;
  },
  router: createFilesRouter,
});
