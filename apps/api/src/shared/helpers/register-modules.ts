import type { ApiModule } from '~/shared/helpers/create-api-module.js';

export const registerModules = <T extends Array<ApiModule<any>>>(...modules: T): T => modules;
