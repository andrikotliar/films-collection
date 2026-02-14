import type { Prisma } from '@prisma/client';
import {
  PAGE_LIMITS,
  type CreatePersonInput,
  type SearchPersonQuery,
  type UpdatePersonInput,
} from '@films-collection/shared';
import { type Deps } from '~/shared';

export class PeopleRepository {
  constructor(private readonly deps: Deps<'databaseService'>) {}

  findPersonById(personId: number) {
    return this.deps.databaseService.person.findUnique({
      where: {
        id: personId,
      },
    });
  }

  getList(options: Prisma.PersonFindManyArgs) {
    return this.deps.databaseService.person.findMany({
      select: {
        id: true,
        name: true,
        selected: true,
      },
      orderBy: {
        name: 'asc',
      },
      ...options,
    });
  }

  count(filters?: Prisma.PersonWhereInput) {
    return this.deps.databaseService.person.count({
      where: filters,
    });
  }

  createPerson(input: CreatePersonInput) {
    return this.deps.databaseService.person.create({
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

    const queryResult = await this.deps.databaseService.person.findMany({
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
      const selectedPeople = await this.deps.databaseService.person.findMany({
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
    return this.deps.databaseService.person.update({
      where: {
        id,
      },
      data: input,
    });
  }

  delete(id: number) {
    return this.deps.databaseService.person.delete({
      where: {
        id,
      },
    });
  }

  getSelected() {
    return this.deps.databaseService.person.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        selected: true,
      },
      orderBy: {
        films: {
          _count: 'asc',
        },
      },
    });
  }
}
