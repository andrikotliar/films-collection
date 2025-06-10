import { Prisma, PrismaClient } from '@prisma/client';
import {
  CreatePersonInput,
  SearchPersonQuery,
  UpdatePersonInput,
} from './schemas';
import { DEFAULT_PAGINATION_LIMIT } from 'src/common';

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

  async searchPerson({ q, selected }: SearchPersonQuery) {
    const whereClause: Prisma.PersonWhereInput = {};

    if (selected) {
      whereClause.id = {
        notIn: selected,
      };
    }

    if (q) {
      whereClause.name = {
        contains: q.trim(),
        mode: 'insensitive',
      };
    } else {
      whereClause.selected = true;
    }

    const queryResult = await this.databaseClient.person.findMany({
      select: {
        id: true,
        name: true,
      },
      where: whereClause,
      take: DEFAULT_PAGINATION_LIMIT,
      orderBy: {
        name: 'asc',
      },
    });

    if (selected) {
      const selectedPeople = await this.databaseClient.person.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          id: {
            in: selected,
          },
        },
      });

      return [...queryResult, ...selectedPeople];
    }

    return queryResult;
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
