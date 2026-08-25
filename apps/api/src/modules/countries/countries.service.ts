import {
  PAGE_LIMITS,
  type CommonListQueryParams,
  type CountriesListResponse,
  type CountryInput,
} from '@films-collection/shared';
import { buildListOptions } from '~/shared/helpers/build-list-options.js';
import { throwIfNotFound } from '~/shared/helpers/throw-if-not-found.js';
import type { Deps } from '~/shared/types/deps.js';

export class CountriesService {
  constructor(private readonly deps: Deps<'countriesRepository'>) {}

  async getListOptions() {
    const countries = await this.deps.countriesRepository.getAll();

    return buildListOptions(countries);
  }

  async getBaseDataList(queries: CommonListQueryParams): Promise<CountriesListResponse> {
    const { list, total } = await this.deps.countriesRepository.getList(queries);

    return { list, total, pageLimit: PAGE_LIMITS.default };
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
