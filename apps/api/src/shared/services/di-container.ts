import { getTypedEntries } from '@films-collection/shared';

type DependencyValue<K extends PropertyKey, TServicesMap extends Record<PropertyKey, any>> = {
  service: TServicesMap[K] | null;
  instance: InstanceType<TServicesMap[K]> | null;
};

export class DiContainer<TServicesMap extends Record<PropertyKey, any>> {
  private readonly servicesMap = new Map<
    keyof TServicesMap,
    DependencyValue<keyof TServicesMap, TServicesMap>
  >();

  constructor(services: Partial<TServicesMap>) {
    getTypedEntries(services).forEach(([key, service]) => {
      this.servicesMap.set(key, {
        service: service ?? null,
        instance: null,
      });
    });
  }

  private getService<K extends keyof TServicesMap>(
    key: K,
  ): DependencyValue<K, TServicesMap> | undefined {
    return this.servicesMap.get(key) as DependencyValue<K, TServicesMap> | undefined;
  }

  resolve<K extends keyof TServicesMap>(key: K): InstanceType<TServicesMap[K]> {
    const serviceData = this.getService(key);

    if (!serviceData) {
      throw new Error(`Service ${String(key)} is not registered`);
    }

    if (serviceData.instance) {
      return serviceData.instance;
    }

    const proxy = new Proxy({} as { [K in keyof TServicesMap]: InstanceType<TServicesMap[K]> }, {
      get: (_target, key: keyof TServicesMap) => {
        const dependency = this.servicesMap.get(key);

        if (!dependency) {
          throw new Error(`${key.toString()} is not registered`);
        }

        const instance = this.resolve(key);

        return instance;
      },
    });

    if (!serviceData.service) {
      throw new Error(`Service ${String(key)} doesn't exist`);
    }

    const instance = new serviceData.service(proxy) as InstanceType<TServicesMap[K]>;

    this.servicesMap.set(key, {
      service: serviceData.service,
      instance,
    });

    return instance;
  }
}
