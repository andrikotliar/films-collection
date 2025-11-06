import type {
  ExtendedServiceInstances,
  ExtendedServiceKeys,
  ServiceKeys,
  ServicesMap,
} from '~/lib/types';

type DependencyValue<K extends ServiceKeys> = {
  service: ServicesMap[K] | null;
  instance: InstanceType<ServicesMap[K]> | null;
};

export class DiContainer {
  private readonly servicesMap = new Map<ServiceKeys, DependencyValue<ServiceKeys>>();

  registerServices(services: ServicesMap) {
    Object.entries(services).forEach(([key, service]) => {
      this.servicesMap.set(key as ServiceKeys, {
        service,
        instance: null,
      });
    });
  }

  private getService<K extends ServiceKeys>(key: K): DependencyValue<K> | undefined {
    return this.servicesMap.get(key) as DependencyValue<K> | undefined;
  }

  resolve<K extends ServiceKeys>(key: K): InstanceType<ServicesMap[K]> {
    const serviceData = this.getService(key);

    if (!serviceData) {
      throw new Error(`Service ${key} is not registered`);
    }

    if (serviceData.instance) {
      return serviceData.instance;
    }

    const proxy = new Proxy({} as ExtendedServiceInstances, {
      get: (_target, key: ServiceKeys) => {
        const dependency = this.servicesMap.get(key);

        if (!dependency) {
          throw new Error(`${key.toString()} is not registered`);
        }

        const instance = this.resolve(key);

        return instance;
      },
    });

    if (!serviceData.service) {
      throw new Error(`Service ${key} doesn't exist`);
    }

    const instance = new serviceData.service(proxy) as InstanceType<ServicesMap[K]>;

    this.servicesMap.set(key, {
      service: serviceData.service,
      instance,
    });

    return instance;
  }

  setInstance(key: ExtendedServiceKeys, instance: any) {
    this.servicesMap.set(key as any, {
      service: null,
      instance,
    });
  }
}
