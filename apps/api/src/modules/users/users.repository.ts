import { eq } from 'drizzle-orm';
import { users } from '~/database/schema';
import { getFirstValue, type Deps } from '~/shared';

export class UsersRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  findById(id: number) {
    return getFirstValue(
      this.deps.db
        .select({
          id: users.id,
          username: users.username,
          refreshToken: users.refreshToken,
        })
        .from(users)
        .where(eq(users.id, id))
        .limit(1),
    );
  }

  findByUsernameWithPassword(username: string) {
    return getFirstValue(
      this.deps.db.select().from(users).where(eq(users.username, username)).limit(1),
    );
  }

  updateById(id: number, data: Partial<typeof users.$inferInsert>) {
    return this.deps.db.update(users).set(data).where(eq(users.id, id)).returning({
      id: users.id,
      refreshToken: users.refreshToken,
    });
  }
}
