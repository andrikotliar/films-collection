import { PrismaClient } from '@prisma/client';
import { ManageGenreInput } from 'src/modules/genres/schemas';

export class GenresRepository {
  constructor(private readonly databaseClient: PrismaClient) {}

  getAll() {
    return this.databaseClient.genre.findMany({
      select: { id: true, title: true },
      orderBy: {
        title: 'asc',
      },
    });
  }

  create(input: ManageGenreInput) {
    return this.databaseClient.genre.create({
      data: input,
    });
  }

  delete(id: number) {
    return this.databaseClient.genre.delete({
      where: { id },
    });
  }

  update(id: number, input: ManageGenreInput) {
    return this.databaseClient.genre.update({
      data: input,
      where: {
        id,
      },
    });
  }
}
