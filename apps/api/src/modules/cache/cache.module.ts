import { InMemoryCacheService } from '~/modules/cache/cache.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const CacheModule = createApiModule({ services: { InMemoryCacheService } });
