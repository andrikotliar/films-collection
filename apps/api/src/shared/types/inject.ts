import type { ExtendedServiceInstances, ExtendedServiceKeys } from '~/shared/types/dependencies.js';

export type Inject<Keys extends ExtendedServiceKeys> = Pick<ExtendedServiceInstances, Keys>;
