import {
  PAGE_LIMITS,
  type CommonListQueryParams,
  type CountriesListResponse,
  type CountryInput,
} from '@films-collection/shared';
import { buildListOptions } from '~/shared/helpers/build-list-options.js';
import { throwIfNotFound } from '~/shared/helpers/throw-if-not-found.js';
import type { Inject } from '~/shared/types/inject.js';

export class CountriesService {
  constructor(private readonly deps: Inject<'CountriesRepository'>) {}

  async getListOptions() {
    const countries = await this.deps.CountriesRepository.getAll();

    return buildListOptions(countries);
  }

  async getBaseDataList(queries: CommonListQueryParams): Promise<CountriesListResponse> {
    const { list, total } = await this.deps.CountriesRepository.getList(queries);

    return { list, total, pageLimit: PAGE_LIMITS.default };
  }

  createCountry(input: CountryInput) {
    return throwIfNotFound(this.deps.CountriesRepository.create(input));
  }

  deleteCountry(id: number) {
    return this.deps.CountriesRepository.delete(id);
  }

  updateCountry(id: number, input: CountryInput) {
    return throwIfNotFound(this.deps.CountriesRepository.update(id, input));
  }
}
