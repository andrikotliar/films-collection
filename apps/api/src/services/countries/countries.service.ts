import { buildListOptions, type DatabaseClient, type Deps } from '~/shared';
import { CountriesRepository } from './countries.repository';
import { ManageCountryInput } from './schemas';

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

  createCountry(input: ManageCountryInput) {
    return this.countriesRepository.create(input);
  }

  deleteCountry(id: number) {
    return this.countriesRepository.delete(id);
  }

  updateCountry(id: number, input: ManageCountryInput) {
    return this.countriesRepository.update(id, input);
  }
}
