import { FastifyInstance } from 'fastify';
import { CountriesRepository } from './countries.repository';
import { CountriesService } from './countries.service';

export const registerCountriesModule = async (app: FastifyInstance) => {
  const countriesRepository = new CountriesRepository(app.database);
  const countriesService = new CountriesService(countriesRepository);

  app.decorate('countriesService', countriesService);
};
