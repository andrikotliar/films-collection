import type { Prisma } from '@prisma/client';
import {
  PAGE_LIMITS,
  type CreatePersonInput,
  type SearchPersonQuery,
  type UpdatePersonInput,
} from '@films-collection/shared';
import { type DatabaseClient, type Deps } from '~/shared';

export class PeopleRepository {
  private readonly databaseClient: DatabaseClient;

  constructor(deps: Deps<'databaseService'>) {
    this.databaseClient = deps.databaseService;
  }

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
      take: PAGE_LIMITS.default,
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
