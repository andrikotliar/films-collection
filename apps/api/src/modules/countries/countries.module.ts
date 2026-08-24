import { CountriesRepository } from '~/modules/countries/countries.repository.js';
import { CountriesService } from '~/modules/countries/countries.service.js';
import { countriesRouter } from '~/modules/countries/countries.router.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const CountriesModule = createApiModule({
  services: { CountriesRepository, CountriesService },
  router: countriesRouter,
});
