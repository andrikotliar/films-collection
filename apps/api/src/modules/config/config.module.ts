import { ConfigService } from '~/modules/config/config.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const ConfigModule = createApiModule({
  services: { ConfigService },
});
