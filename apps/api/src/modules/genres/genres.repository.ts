import { getCount, getFirstValue, type Deps } from '~/shared';
import { PAGE_LIMITS, type GenreInput } from '@films-collection/shared';
import { genres } from '~/database/schema';
import { asc, eq } from 'drizzle-orm';

export class GenresRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  getAll() {
    return this.deps.db
      .select({
        id: genres.id,
        title: genres.title,
        updatedAt: genres.updatedAt,
      })
      .from(genres)
      .orderBy(asc(genres.title))
      .limit(PAGE_LIMITS.default);
  }

  create(input: GenreInput) {
    return getFirstValue(this.deps.db.insert(genres).values(input).returning());
  }

  async delete(id: number) {
    await this.deps.db.delete(genres).where(eq(genres.id, id));
  }

  update(id: number, input: GenreInput) {
    return getFirstValue(
      this.deps.db.update(genres).set(input).where(eq(genres.id, id)).returning(),
    );
  }

  count() {
    return getCount(this.deps.db, genres);
  }
}
