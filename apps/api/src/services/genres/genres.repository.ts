import type { DatabaseClient, Deps } from '~/shared';
import type { GenreInput } from '@films-collection/shared';

export class GenresRepository {
  private readonly databaseClient: DatabaseClient;

  constructor(deps: Deps<'databaseService'>) {
    this.databaseClient = deps.databaseService;
  }

  getAll() {
    return this.databaseClient.genre.findMany({
      select: { id: true, title: true },
      orderBy: {
        title: 'asc',
      },
    });
  }

  create(input: GenreInput) {
    return this.databaseClient.genre.create({
      data: input,
    });
  }

  delete(id: number) {
    return this.databaseClient.genre.delete({
      where: { id },
    });
  }

  update(id: number, input: GenreInput) {
    return this.databaseClient.genre.update({
      data: input,
      where: {
        id,
      },
    });
  }
}
