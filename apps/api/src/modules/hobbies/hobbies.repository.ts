import { eq } from 'drizzle-orm';
import { hobbies, type Hobby } from '~/database/schema.js';
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
}
