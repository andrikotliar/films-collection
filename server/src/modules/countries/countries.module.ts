import { createCountriesRouter } from './countries.router';
import { CountriesRepository } from './countries.repository';
import { CountriesService } from './countries.service';
import { createModule } from 'src/common';

export const CountriesModule = createModule({
  prefix: 'countries',
  service: (app) => {
    const countriesRepository = new CountriesRepository(app.database);
    const countriesService = new CountriesService(countriesRepository);

    return countriesService;
  },
  router: createCountriesRouter,
});
