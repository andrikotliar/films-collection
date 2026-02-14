import type { Deps } from '~/shared';
import type { StudioInput } from '@films-collection/shared';

export class StudiosRepository {
  constructor(private readonly deps: Deps<'databaseService'>) {}

  getAll() {
    return this.deps.databaseService.studio.findMany({
      select: { id: true, title: true },
      orderBy: {
        title: 'asc',
      },
    });
  }

  create(input: StudioInput) {
    return this.deps.databaseService.studio.create({ data: input });
  }

  delete(id: number) {
    return this.deps.databaseService.studio.delete({ where: { id } });
  }

  update(id: number, input: StudioInput) {
    return this.deps.databaseService.studio.update({
      where: {
        id,
      },
      data: input,
    });
  }
}
