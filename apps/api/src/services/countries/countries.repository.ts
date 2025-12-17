import type { DatabaseClient, Deps } from '~/shared';
import type { CountryInput } from '@films-collection/shared';

export class CountriesRepository {
  private readonly databaseClient: DatabaseClient;

  constructor(deps: Deps<'databaseService'>) {
    this.databaseClient = deps.databaseService;
  }

  getAll() {
    return this.databaseClient.country.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        title: 'asc',
      },
    });
  }

  create(input: CountryInput) {
    return this.databaseClient.country.create({
      data: input,
    });
  }

  delete(id: number) {
    return this.databaseClient.country.delete({ where: { id } });
  }

  update(id: number, input: CountryInput) {
    return this.databaseClient.country.update({
      where: {
        id,
      },
      data: input,
    });
  }
}
