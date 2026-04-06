import { and, eq } from 'drizzle-orm';
import { users, usersSessions, type UserSession } from '~/database/schema';
import { getFirstValue, type Deps } from '~/shared';
import crypto from 'node:crypto';

export class UsersRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  findById(id: number) {
    return getFirstValue(
      this.deps.db
        .select({
          id: users.id,
          username: users.username,
          refreshToken: usersSessions.refreshToken,
        })
        .from(users)
        .leftJoin(usersSessions, eq(usersSessions.userId, users.id))
        .where(eq(users.id, id))
        .limit(1),
    );
  }

  findByUsernameWithPassword(username: string) {
    return getFirstValue(
      this.deps.db.select().from(users).where(eq(users.username, username)).limit(1),
    );
  }

  updateSession(userId: number, sessionId: string, payload: Partial<UserSession>) {
    return this.deps.db
      .update(usersSessions)
      .set(payload)
      .where(and(eq(usersSessions.userId, userId), eq(usersSessions.sessionId, sessionId)))
      .returning({
        userId: usersSessions.userId,
        refreshToken: usersSessions.refreshToken,
      });
  }

  createSession(payload: Pick<UserSession, 'deviceInfo' | 'refreshToken' | 'userId'>) {
    return getFirstValue(
      this.deps.db
        .insert(usersSessions)
        .values({
          ...payload,
          sessionId: crypto.randomUUID(),
        })
        .returning({ sessionId: usersSessions.sessionId }),
    );
  }

  getUserSession(userId: number, sessionId: string) {
    return getFirstValue(
      this.deps.db
        .select({ refreshToken: usersSessions.refreshToken, userId: usersSessions.userId })
        .from(usersSessions)
        .where(and(eq(usersSessions.userId, userId), eq(usersSessions.sessionId, sessionId)))
        .limit(1),
    );
  }

  removeSession(userId: number, sessionId: string) {
    return this.deps.db
      .delete(usersSessions)
      .where(and(eq(usersSessions.userId, userId), eq(usersSessions.sessionId, sessionId)));
  }
}
