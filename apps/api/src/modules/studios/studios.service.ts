import {
  PAGE_LIMITS,
  type CommonListQueryParams,
  type StudioInput,
  type StudiosListResponse,
} from '@films-collection/shared';
import { buildListOptions } from '~/shared/helpers/build-list-options.js';
import type { Inject } from '~/shared/types/inject.js';

export class StudiosService {
  constructor(private readonly deps: Inject<'StudiosRepository'>) {}

  async getListOptions() {
    const sortedGenres = await this.deps.StudiosRepository.getAll();

    return buildListOptions(sortedGenres);
  }

  async getBaseDataList(queries: CommonListQueryParams): Promise<StudiosListResponse> {
    const { list, total } = await this.deps.StudiosRepository.getList(queries);

    return { list, total, pageLimit: PAGE_LIMITS.default };
  }

  createStudio(input: StudioInput) {
    return this.deps.StudiosRepository.create(input);
  }

  deleteStudio(id: number) {
    return this.deps.StudiosRepository.delete(id);
  }

  updateStudio(id: number, input: StudioInput) {
    return this.deps.StudiosRepository.update(id, input);
  }
}
