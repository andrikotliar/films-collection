import { Prisma, PrismaClient } from '@prisma/client';
import { SearchPersonQuery } from 'src/modules/people/schemas';

export class PeopleRepository {
  constructor(private prismaClient: PrismaClient) {}

  findPersonById(personId: number) {
    return this.prismaClient.person.findUnique({
      where: {
        id: personId,
      },
    });
  }

  searchPersonByName({ q, selectedIds }: SearchPersonQuery) {
    const whereClause: Prisma.PersonWhereInput = {
      name: {
        contains: q,
        mode: 'insensitive',
      },
    };

    if (selectedIds?.length) {
      whereClause.id = {
        notIn: selectedIds,
      };
    }

    return this.prismaClient.person.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
      where: whereClause,
      orderBy: {
        name: 'asc',
      },
    });
  }
}
