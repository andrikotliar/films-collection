import { buildListOptions, type Deps } from '~/shared';
import type { CountryInput } from '@films-collection/shared';

export class CountriesService {
  constructor(private readonly deps: Deps<'countriesRepository'>) {}

  async getListOptions() {
    const countries = await this.deps.countriesRepository.getAll();

    return buildListOptions(countries);
  }

  getBaseDataList() {
    return this.deps.countriesRepository.getAll();
  }

  createCountry(input: CountryInput) {
    return this.deps.countriesRepository.create(input);
  }

  deleteCountry(id: number) {
    return this.deps.countriesRepository.delete(id);
  }

  updateCountry(id: number, input: CountryInput) {
    return this.deps.countriesRepository.update(id, input);
  }
}
