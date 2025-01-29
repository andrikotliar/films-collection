import { FastifyInstance } from 'fastify';
import { GenresRepository } from './genres.repository';
import { GenresService } from './genres.service';

export const registerGenresModule = async (app: FastifyInstance) => {
  const genresRepository = new GenresRepository(app.database);
  const genresService = new GenresService(genresRepository);

  app.decorate('genresService', genresService);
};
