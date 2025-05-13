import { PrismaClient } from '@prisma/client';

export class CountriesRepository {
  constructor(private databaseClient: PrismaClient) {}

  getAll() {
    return this.databaseClient.country.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        title: 'asc',
      },
    });
  }
}
