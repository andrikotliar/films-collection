import type { DatabaseClient } from 'src/common';
import { ManageCountryInput } from 'src/modules/countries/schemas';

export class CountriesRepository {
  constructor(private readonly databaseClient: DatabaseClient) {}

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
