import { Prisma, PrismaClient } from '@prisma/client';
import {
  CreatePersonInput,
  SearchPersonQuery,
  UpdatePersonInput,
} from './schemas';

export class PeopleRepository {
  constructor(private readonly databaseClient: PrismaClient) {}

  findPersonById(personId: number) {
    return this.databaseClient.person.findUnique({
      where: {
        id: personId,
      },
    });
  }

  getList(options: Prisma.PersonFindManyArgs) {
    return this.databaseClient.person.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
      orderBy: {
        name: 'asc',
      },
      ...options,
    });
  }

  count(filters?: Prisma.PersonWhereInput) {
    return this.databaseClient.person.count({
      where: filters,
    });
  }

  createPerson(input: CreatePersonInput) {
    return this.databaseClient.person.create({
      data: input,
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

  update(id: number, input: UpdatePersonInput) {
    return this.databaseClient.person.update({
      where: {
        id,
      },
      data: input,
    });
  }

  delete(id: number) {
    return this.databaseClient.person.delete({
      where: {
        id,
      },
    });
  }
}
