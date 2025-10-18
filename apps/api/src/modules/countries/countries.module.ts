import { CountriesRepository } from '~/modules/countries/countries.repository';
import { CountriesService } from '~/modules/countries/countries.service';
import { database } from '~/modules/database/database.module';

const repository = new CountriesRepository(database);
export const countries = new CountriesService(repository);
