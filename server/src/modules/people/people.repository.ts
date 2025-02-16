import { PrismaClient } from '@prisma/client';

export class PeopleRepository {
  constructor(private prismaClient: PrismaClient) {}

  findPersonById(personId: number) {
    return this.prismaClient.person.findUnique({
      where: {
        id: personId,
      },
    });
  }
}
