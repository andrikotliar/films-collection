import { StorageService } from '~/modules/storage/storage.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const StorageModule = createApiModule({
  services: { StorageService },
});
