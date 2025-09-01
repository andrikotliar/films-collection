import { CountriesRepository } from 'src/modules/countries/countries.repository';
import { CountriesService } from 'src/modules/countries/countries.service';
import { database } from 'src/modules/database/database.module';

const repository = new CountriesRepository(database);
export const countries = new CountriesService(repository);
