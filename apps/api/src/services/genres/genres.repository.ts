import type { Deps } from '~/shared';
import type { GenreInput } from '@films-collection/shared';

export class GenresRepository {
  constructor(private readonly deps: Deps<'databaseService'>) {}

  getAll() {
    return this.deps.databaseService.genre.findMany({
      select: { id: true, title: true },
      orderBy: {
        title: 'asc',
      },
    });
  }

  create(input: GenreInput) {
    return this.deps.databaseService.genre.create({
      data: input,
    });
  }

  delete(id: number) {
    return this.deps.databaseService.genre.delete({
      where: { id },
    });
  }

  update(id: number, input: GenreInput) {
    return this.deps.databaseService.genre.update({
      data: input,
      where: {
        id,
      },
    });
  }
}
