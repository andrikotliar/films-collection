import { buildListOptions, listResponse, type Deps } from '~/shared';
import { PAGE_LIMITS, type StudioInput } from '@films-collection/shared';

export class StudiosService {
  constructor(private readonly deps: Deps<'studiosRepository'>) {}

  async getListOptions() {
    const sortedGenres = await this.deps.studiosRepository.getAll();

    return buildListOptions(sortedGenres);
  }

  async getBaseDataList() {
    const list = await this.deps.studiosRepository.getAll();
    const total = await this.deps.studiosRepository.count();

    return listResponse({ list, total, pageLimit: PAGE_LIMITS.default });
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
