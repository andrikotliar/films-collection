import type { HobbyItemInput } from '@films-collection/shared';
import { eq } from 'drizzle-orm';
import {
  hobbies,
  hobbyItems,
  hobbyItemsCollections,
  hobbyItemsPeople,
  type Hobby,
} from '~/database/schema.js';
import type { Deps } from '~/shared/types/deps.js';

export class HobbiesRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  list() {
    return this.deps.db.select({ id: hobbies.id, title: hobbies.title }).from(hobbies);
  }

  countHobbies() {
    return this.deps.db.$count(hobbies);
  }

  get(id: number) {
    return this.deps.db.query.hobbies.findFirst({
      where: eq(hobbies.id, id),
      columns: {
        title: true,
        id: true,
      },
      with: {
        items: {
          columns: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });
  }

  create(input: Hobby) {
    return this.deps.db
      .insert(hobbies)
      .values(input)
      .returning({ id: hobbies.id, title: hobbies.title });
  }

  update(id: number, input: Partial<Hobby>) {
    return this.deps.db
      .update(hobbies)
      .set(input)
      .where(eq(hobbies.id, id))
      .returning({ id: hobbies.id, title: hobbies.title });
  }

  async delete(id: number) {
    await this.deps.db.delete(hobbies).where(eq(hobbies.id, id));
  }

  async deleteItem(id: number) {
    await this.deps.db.delete(hobbyItems).where(eq(hobbyItems.id, id));
  }

  async createHobbyItem(input: HobbyItemInput, hobbyId: number) {
    return await this.deps.db.transaction(async (tr) => {
      const [newHobbyItem] = await tr
        .insert(hobbyItems)
        .values({
          ...input,
          hobbyId,
        })
        .returning({ id: hobbyItems.id });

      if (input.collections.length) {
        await tr.insert(hobbyItemsCollections).values(
          input.collections.map((collection) => ({
            collectionId: collection.collectionId,
            hobbyItemId: newHobbyItem.id,
            order: collection.order,
          })),
        );
      }

      if (input.people) {
        await tr
          .insert(hobbyItemsPeople)
          .values(input.people.map((personId) => ({ personId, hobbyItemId: newHobbyItem.id })));
      }

      return newHobbyItem.id;
    });
  }

  getHobbyItemById(id: number) {
    return this.deps.db.query.hobbyItems.findFirst({
      where: eq(hobbyItems.id, id),
      columns: {
        id: true,
        title: true,
        description: true,
        releaseYear: true,
      },
      with: {
        collections: {
          with: {
            collection: {
              columns: {
                id: true,
                title: true,
              },
            },
          },
        },
        authors: {
          with: {
            person: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  getHobbiesItemsByCollection(collectionId: number) {
    return this.deps.db.query.hobbyItemsCollections.findMany({
      where: eq(hobbyItemsCollections.collectionId, collectionId),
      columns: {
        order: true,
      },
      with: {
        hobbyItem: {
          columns: {
            id: true,
            title: true,
            imageUrl: true,
          },
        },
      },
    });
  }
}
