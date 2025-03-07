import { buildListOptions } from 'src/common';
import { CountriesRepository } from './countries.repository';

export class CountriesService {
  constructor(private countriesRepository: CountriesRepository) {}

  async getListOptions() {
    const countries = await this.countriesRepository.getAll();

    return buildListOptions(countries);
  }
}
