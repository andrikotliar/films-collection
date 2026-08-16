import type { Hobby } from '~/database/schema.js';
import { getFirstValue, type Deps, throwIfNotFound } from '~/shared/index.js';

export class HobbiesService {
  constructor(private readonly deps: Deps<'hobbiesRepository'>) {}

  create(input: Hobby) {
    return throwIfNotFound(getFirstValue(this.deps.hobbiesRepository.create(input)));
  }
}
