import { eq } from 'drizzle-orm';
import { hobbies, type Hobby } from '~/database/schema.js';
import type { Deps } from '~/shared/index.js';

export class HobbiesRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  list() {
    return this.deps.db.select({ id: hobbies.id, title: hobbies.title }).from(hobbies);
  }

  get(id: string) {
    return this.deps.db.query.hobbies.findFirst({
      where: eq(hobbies.id, id),
      columns: {
        title: true,
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

  update(id: string, input: Hobby) {
    return this.deps.db
      .update(hobbies)
      .set(input)
      .where(eq(hobbies.id, id))
      .returning({ id: hobbies.id, title: hobbies.title });
  }

  async delete(id: string) {
    await this.deps.db.delete(hobbies).where(eq(hobbies.id, id));
  }
}
