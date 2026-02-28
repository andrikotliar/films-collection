import { buildListOptions, type Deps } from '~/shared';
import type { StudioInput } from '@films-collection/shared';

export class StudiosService {
  constructor(private readonly deps: Deps<'studiosRepository'>) {}

  async getListOptions() {
    const sortedGenres = await this.deps.studiosRepository.getAll();

    return buildListOptions(sortedGenres);
  }

  getBaseDataList() {
    return this.deps.studiosRepository.getAll();
  }

  createStudio(input: StudioInput) {
    return this.deps.studiosRepository.create(input);
  }

  deleteStudio(id: number) {
    return this.deps.studiosRepository.delete(id);
  }

  updateStudio(id: number, input: StudioInput) {
    return this.deps.studiosRepository.update(id, input);
  }
}
