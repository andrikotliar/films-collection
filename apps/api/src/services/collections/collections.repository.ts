import type { CreateCollectionInput, UpdateCollectionInput } from '@films-collection/shared';
import type { Deps } from '~/shared';

export class CollectionsRepository {
  constructor(private readonly deps: Deps<'databaseService'>) {}

  getCollectionById(id: number) {
    return this.deps.databaseService.collection.findUnique({
      where: {
        id,
      },
    });
  }

  getAll() {
    return this.deps.databaseService.collection.findMany({
      select: {
        id: true,
        title: true,
        category: true,
      },
      orderBy: {
        title: 'asc',
      },
    });
  }

  create(input: CreateCollectionInput) {
    return this.deps.databaseService.collection.create({
      data: input,
    });
  }

  delete(id: number) {
    return this.deps.databaseService.collection.delete({
      where: { id },
    });
  }

  update(id: number, input: UpdateCollectionInput) {
    return this.deps.databaseService.collection.update({
      where: { id },
      data: input,
    });
  }

  countFilmsByCollection(collectionId: number) {
    return this.deps.databaseService.filmCollection.count({
      where: {
        collectionId,
      },
    });
  }
}
