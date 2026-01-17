import type { Prisma } from '@prisma/client';
import type { DatabaseClient } from '~/shared';

export class BaseRepository {
  constructor(private readonly db: DatabaseClient) {}

  transaction(promises: Prisma.PrismaPromise<any>[]) {
    return this.db.$transaction(promises);
  }
}
