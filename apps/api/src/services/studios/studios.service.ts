import { buildListOptions, type Deps } from '~/lib';
import { StudiosRepository } from './studios.repository';
import { ManageStudioInput } from './schemas';

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

  createStudio(input: ManageStudioInput) {
    return this.studiosRepository.create(input);
  }

  deleteStudio(id: number) {
    return this.studiosRepository.delete(id);
  }

  updateStudio(id: number, input: ManageStudioInput) {
    return this.studiosRepository.update(id, input);
  }
}
