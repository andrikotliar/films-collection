import { FastifyInstance } from 'fastify';
import { GenresRepository } from './genres.repository';
import { GenresService } from './genres.service';
import fastifyPlugin from 'fastify-plugin';

export const GenresModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    const genresRepository = new GenresRepository(app.database);
    const genresService = new GenresService(genresRepository);

    app.decorate('genresService', genresService);
  },
  { name: 'genresModule' },
);
