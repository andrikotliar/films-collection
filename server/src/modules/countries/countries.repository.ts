import { PrismaClient } from '@prisma/client';

export class CountriesRepository {
  constructor(private prismaClient: PrismaClient) {}

  getAll() {
    return this.prismaClient.country.findMany({
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
