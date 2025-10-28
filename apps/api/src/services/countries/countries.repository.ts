import type { DatabaseClient, Deps } from '~/common';
import { ManageCountryInput } from '~/services/countries/schemas';

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

  create(input: ManageCountryInput) {
    return this.databaseClient.country.create({
      data: input,
    });
  }

  delete(id: number) {
    return this.databaseClient.country.delete({ where: { id } });
  }

  update(id: number, input: ManageCountryInput) {
    return this.databaseClient.country.update({
      where: {
        id,
      },
      data: input,
    });
  }
}
