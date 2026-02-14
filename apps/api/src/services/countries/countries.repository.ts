import type { Deps } from '~/shared';
import type { CountryInput } from '@films-collection/shared';

export class CountriesRepository {
  constructor(private readonly deps: Deps<'databaseService'>) {}

  getAll() {
    return this.deps.databaseService.country.findMany({
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
    return this.deps.databaseService.country.create({
      data: input,
    });
  }

  delete(id: number) {
    return this.deps.databaseService.country.delete({ where: { id } });
  }

  update(id: number, input: CountryInput) {
    return this.deps.databaseService.country.update({
      where: {
        id,
      },
      data: input,
    });
  }
}
