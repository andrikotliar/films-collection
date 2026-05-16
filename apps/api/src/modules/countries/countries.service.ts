import { buildListOptions, listResponse, throwIfNotFound, type Deps } from '~/shared/index.js';
import { PAGE_LIMITS, type CountryInput } from '@films-collection/shared';

export class CountriesService {
  constructor(private readonly deps: Deps<'countriesRepository'>) {}

  async getListOptions() {
    const countries = await this.deps.countriesRepository.getAll();

    return buildListOptions(countries);
  }

  async getBaseDataList() {
    const list = await this.deps.countriesRepository.getAll();
    const total = await this.deps.countriesRepository.count();

    return listResponse({ list, total, pageLimit: PAGE_LIMITS.default });
  }

  createCountry(input: CountryInput) {
    return throwIfNotFound(this.deps.countriesRepository.create(input));
  }

  deleteCountry(id: number) {
    return this.deps.countriesRepository.delete(id);
  }

  updateCountry(id: number, input: CountryInput) {
    return throwIfNotFound(this.deps.countriesRepository.update(id, input));
  }
}
