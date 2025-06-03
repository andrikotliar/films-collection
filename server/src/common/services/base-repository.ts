import { Prisma, PrismaClient } from '@prisma/client';

export class BaseRepository {
  constructor(private readonly db: PrismaClient) {}

  transaction(promises: Prisma.PrismaPromise<any>[]) {
    return this.db.$transaction(promises);
  }
}
