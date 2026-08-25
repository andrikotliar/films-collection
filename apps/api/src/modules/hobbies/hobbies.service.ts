import type { HobbiesListResponse } from '@films-collection/shared';
import type { Hobby } from '~/database/schema.js';
import { getFirstValue } from '~/shared/helpers/get-first-value.js';
import { throwIfNotFound } from '~/shared/helpers/throw-if-not-found.js';
import type { Deps } from '~/shared/types/deps.js';

export class HobbiesService {
  constructor(private readonly deps: Deps<'hobbiesRepository'>) {}

  create(input: Hobby) {
    return throwIfNotFound(getFirstValue(this.deps.hobbiesRepository.create(input)));
  }

  update(id: number, input: Partial<Hobby>) {
    return throwIfNotFound(getFirstValue(this.deps.hobbiesRepository.update(id, input)));
  }

  async getHobbiesList(): Promise<HobbiesListResponse> {
    const list = await this.deps.hobbiesRepository.list();
    const total = await this.deps.hobbiesRepository.countHobbies();

    return { list, total, pageLimit: 0 };
  }

  delete(id: number) {
    return this.deps.hobbiesRepository.delete(id);
  }
}
