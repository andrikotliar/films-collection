import { PrismaClient } from '@prisma/client';
import { ManageStudioInput } from 'src/modules/studios/schemas';

export class StudiosRepository {
  constructor(private readonly databaseClient: PrismaClient) {}

  getAll() {
    return this.databaseClient.studio.findMany({
      select: { id: true, title: true },
      orderBy: {
        title: 'asc',
      },
    });
  }

  create(input: ManageStudioInput) {
    return this.databaseClient.studio.create({ data: input });
  }

  delete(id: number) {
    return this.databaseClient.studio.delete({ where: { id } });
  }

  update(id: number, input: ManageStudioInput) {
    return this.databaseClient.studio.update({
      where: {
        id,
      },
      data: input,
    });
  }
}
