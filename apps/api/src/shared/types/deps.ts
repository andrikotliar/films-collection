import type { ApiServices } from '~/modules/app.module.js';
import type { Tools } from '~/shared/types/tools.js';

export type ServiceInstances = { [K in keyof ApiServices]: InstanceType<ApiServices[K]> } & Tools;

export type Deps<Keys extends keyof ServiceInstances> = Pick<ServiceInstances, Keys>;
