import { buildListOptions, type Deps } from '~/shared';
import type { CountriesRepository } from './countries.repository';
import type { CountryInput } from '@films-collection/shared';

export class CountriesService {
  private readonly countriesRepository: CountriesRepository;

  constructor(deps: Deps<'countriesRepository'>) {
    this.countriesRepository = deps.countriesRepository;
  }

  async getListOptions() {
    const countries = await this.countriesRepository.getAll();

    return buildListOptions(countries);
  }

  getBaseDataList() {
    return this.countriesRepository.getAll();
  }

  createCountry(input: CountryInput) {
    return this.countriesRepository.create(input);
  }

  deleteCountry(id: number) {
    return this.countriesRepository.delete(id);
  }

  updateCountry(id: number, input: CountryInput) {
    return this.countriesRepository.update(id, input);
  }
}
