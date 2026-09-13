import type {
  HobbyByIdResponse,
  HobbyItemInput,
  HobbiesListResponse,
  HobbyItemResponse,
  HobbyItemUpdateInput,
  HobbyByIdAdminResponse,
  HobbyByIdQueries,
} from '@films-collection/shared';
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

  async getHobby(id: number, queryParams: HobbyByIdQueries): Promise<HobbyByIdResponse> {
    const hobby = await throwIfNotFound(this.deps.hobbiesRepository.get(id, queryParams));

    return {
      ...hobby,
      items: hobby.items.map((hobby) => ({
        ...hobby,
        authors: hobby.authors.map((author) => author.person),
      })),
    };
  }

  async createHobbyItem(input: HobbyItemInput, hobbyId: number): Promise<HobbyItemResponse> {
    const hobbyItemId = await this.deps.hobbiesRepository.createHobbyItem(input, hobbyId);

    return this.getHobbyItemById(hobbyItemId);
  }

  async getHobbyItemById(id: number): Promise<HobbyItemResponse> {
    const item = await throwIfNotFound(this.deps.hobbiesRepository.getHobbyItemById(id));

    return {
      ...item,
      collections: item.collections.map(({ collection }) => collection),
      authors: item.authors.map(({ person }) => person),
    };
  }

  delete(id: number) {
    return this.deps.hobbiesRepository.delete(id);
  }

  deleteItem(id: number) {
    return this.deps.hobbiesRepository.deleteItem(id);
  }

  async getItemsByCollection(collectionId: number) {
    const items = await this.deps.hobbiesRepository.getHobbiesItemsByCollection(collectionId);

    return items.map((item) => ({
      ...item.hobbyItem,
      order: item.order,
    }));
  }

  async updateHobbyItem(id: number, input: HobbyItemUpdateInput) {
    await this.deps.hobbiesRepository.updateHobbyItem(id, input);

    return this.getHobbyItemById(id);
  }

  async getAdminHobby(id: number): Promise<HobbyByIdAdminResponse> {
    const data = await throwIfNotFound(this.deps.hobbiesRepository.getHobbyAdmin(id));

    return {
      ...data,
      items: data.items.map((item) => ({
        ...item,
        people: item.authors.map((person) => person.personId),
        collections: item.collections.map((collection) => ({
          collectionId: collection.collectionId,
          order: collection.order ?? 0,
        })),
      })),
    };
  }
}
