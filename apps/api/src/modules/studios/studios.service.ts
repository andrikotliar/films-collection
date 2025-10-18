import { buildListOptions } from '~/common';
import { StudiosRepository } from './studios.repository';
import { ManageStudioInput } from './schemas';

export class StudiosService {
  constructor(private readonly studiosRepository: StudiosRepository) {}

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
