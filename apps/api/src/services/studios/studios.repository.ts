import { PrismaClient } from '@prisma/client';
import type { DatabaseClient, Deps } from '~/shared';
import { ManageStudioInput } from '~/services/studios/schemas';

export class StudiosRepository {
  private readonly databaseClient: DatabaseClient;

  constructor(deps: Deps<'databaseService'>) {
    this.databaseClient = deps.databaseService;
  }

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
