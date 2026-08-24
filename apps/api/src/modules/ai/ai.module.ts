import { AiService } from '~/modules/ai/ai.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const AiModule = createApiModule({
  services: { AiService },
});
