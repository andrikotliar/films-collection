import { PrismaClient } from '@prisma/client';
import { CreateCollectionInput } from './schemas';
import { UpdateCollectionInput } from 'src/modules/collections/schemas/update-collection.schema';

export class CollectionsRepository {
  constructor(private readonly databaseClient: PrismaClient) {}

  getCollectionById(id: number) {
    return this.databaseClient.collection.findUnique({
      where: {
        id,
      },
    });
  }

  getAll() {
    return this.databaseClient.collection.findMany({
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
    return this.databaseClient.collection.create({
      data: input,
    });
  }

  delete(id: number) {
    return this.databaseClient.collection.delete({
      where: { id },
    });
  }

  update(id: number, input: UpdateCollectionInput) {
    return this.databaseClient.collection.update({
      where: { id },
      data: input,
    });
  }
}
