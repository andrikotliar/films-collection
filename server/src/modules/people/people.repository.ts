import { Prisma, PrismaClient } from '@prisma/client';
import {
  CreatePersonPayload,
  SearchPersonQuery,
} from 'src/modules/people/schemas';

export class PeopleRepository {
  constructor(private databaseClient: PrismaClient) {}

  findPersonById(personId: number) {
    return this.databaseClient.person.findUnique({
      where: {
        id: personId,
      },
    });
  }

  createPerson(payload: CreatePersonPayload) {
    return this.databaseClient.person.create({
      data: payload,
    });
  }

  searchPersonByName({ q }: SearchPersonQuery) {
    const whereClause: Prisma.PersonWhereInput = {
      name: {
        contains: q,
        mode: 'insensitive',
      },
    };

    return this.databaseClient.person.findMany({
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
