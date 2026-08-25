import {
  PAGE_LIMITS,
  type CommonListQueryParams,
  type StudioInput,
  type StudiosListResponse,
} from '@films-collection/shared';
import { buildListOptions } from '~/shared/helpers/build-list-options.js';
import type { Deps } from '~/shared/types/deps.js';

export class StudiosService {
  constructor(private readonly deps: Deps<'studiosRepository'>) {}

  async getListOptions() {
    const sortedGenres = await this.deps.studiosRepository.getAll();

    return buildListOptions(sortedGenres);
  }

  async getBaseDataList(queries: CommonListQueryParams): Promise<StudiosListResponse> {
    const { list, total } = await this.deps.studiosRepository.getList(queries);

    return { list, total, pageLimit: PAGE_LIMITS.default };
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
