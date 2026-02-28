import type { Deps } from '~/shared';
import type { StudioInput } from '@films-collection/shared';
import { studios } from '~/database/schema';
import { asc, eq } from 'drizzle-orm';

export class StudiosRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  getAll() {
    return this.deps.db
      .select({ id: studios.id, title: studios.title })
      .from(studios)
      .orderBy(asc(studios.title));
  }

  async create(input: StudioInput) {
    const [studio] = await this.deps.db.insert(studios).values(input).returning();

    return studio;
  }

  async delete(id: number) {
    await this.deps.db.delete(studios).where(eq(studios.id, id));
  }

  async update(id: number, input: StudioInput) {
    const [studio] = await this.deps.db
      .update(studios)
      .set(input)
      .where(eq(studios.id, id))
      .returning();

    return studio;
  }
}
