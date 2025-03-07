import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { CountriesRepository } from './countries.repository';
import { CountriesService } from './countries.service';

export const CountriesModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    const countriesRepository = new CountriesRepository(app.database);
    const countriesService = new CountriesService(countriesRepository);

    app.decorate('countriesService', countriesService);
  },
  { name: 'countriesModule' },
);
