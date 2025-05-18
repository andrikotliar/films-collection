import { buildListOptions } from 'src/common';
import { CountriesRepository } from './countries.repository';
import { ManageCountryInput } from './schemas';

export class CountriesService {
  constructor(private readonly countriesRepository: CountriesRepository) {}

  async getListOptions() {
    const countries = await this.countriesRepository.getAll();

    return buildListOptions(countries);
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
