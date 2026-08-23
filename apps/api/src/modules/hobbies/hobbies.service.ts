import type { Hobby } from '~/database/schema.js';
import { getFirstValue, type Deps, throwIfNotFound, listResponse } from '~/shared/index.js';

export class HobbiesService {
  constructor(private readonly deps: Deps<'hobbiesRepository'>) {}

  create(input: Hobby) {
    return throwIfNotFound(getFirstValue(this.deps.hobbiesRepository.create(input)));
  }

  update(id: number, input: Partial<Hobby>) {
    return throwIfNotFound(getFirstValue(this.deps.hobbiesRepository.update(id, input)));
  }

  async getHobbiesList() {
    const list = await this.deps.hobbiesRepository.list();
    const total = await this.deps.hobbiesRepository.countHobbies();

    return listResponse({ list, total, pageLimit: 0 });
  }

  delete(id: number) {
    return this.deps.hobbiesRepository.delete(id);
  }
}
