import { buildListOptions, type Deps } from '~/shared';
import type { StudiosRepository } from './studios.repository';
import type { StudioInput } from '@films-collection/shared';

export class StudiosService {
  private readonly studiosRepository: StudiosRepository;

  constructor(deps: Deps<'studiosRepository'>) {
    this.studiosRepository = deps.studiosRepository;
  }

  async getListOptions() {
    const sortedGenres = await this.studiosRepository.getAll();

    return buildListOptions(sortedGenres);
  }

  getBaseDataList() {
    return this.studiosRepository.getAll();
  }

  createStudio(input: StudioInput) {
    return this.studiosRepository.create(input);
  }

  deleteStudio(id: number) {
    return this.studiosRepository.delete(id);
  }

  updateStudio(id: number, input: StudioInput) {
    return this.studiosRepository.update(id, input);
  }
}
