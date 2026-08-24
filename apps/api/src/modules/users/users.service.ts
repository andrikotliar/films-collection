import type { UserSession } from '~/database/schema.js';
import crypto from 'node:crypto';
import type {
  UpdateUserPasswordInput,
  UpdateUserTranslationPreferences,
  UserSessionResponse,
} from '@films-collection/shared';
import { compare, hash } from 'bcrypt';
import type { Inject } from '~/shared/types/inject.js';
import { throwIfNotFound } from '~/shared/helpers/throw-if-not-found.js';
import type { RequestUser } from '~/shared/helpers/get-request-user.js';
import { BadRequestException } from '~/shared/exceptions/bad-request.js';

export class UsersService {
  constructor(private readonly deps: Inject<'UsersRepository' | 'Jwt'>) {}

  getUser(userId: number) {
    return this.deps.UsersRepository.findById(userId);
  }

  async getUserByUsername(username: string) {
    return this.deps.UsersRepository.findByUsernameWithPassword(username);
  }

  async setRefreshToken(userId: number, sessionId: string, token: string | null) {
    const now = new Date();
    return this.deps.UsersRepository.updateSession(userId, sessionId, {
      refreshToken: token,
      lastActivityAt: now.toISOString(),
    });
  }

  async getUserSession(userId: number, sessionId: string) {
    return this.deps.UsersRepository.getUserSession(userId, sessionId);
  }

  async createUserSession(payload: Pick<UserSession, 'deviceInfo' | 'refreshToken' | 'userId'>) {
    const now = new Date();
    await this.deps.UsersRepository.clearStaledSessions(payload.userId);
    return throwIfNotFound(
      this.deps.UsersRepository.createSession({
        ...payload,
        sessionId: crypto.randomUUID(),
        lastActivityAt: now.toISOString(),
      }),
    );
  }

  deleteSession(sessionId: string) {
    return this.deps.UsersRepository.removeSession(sessionId);
  }

  async getUserSessions(user: RequestUser): Promise<UserSessionResponse[]> {
    const sessions = await this.deps.UsersRepository.getSessions(user.id);

    return sessions.map((session) => ({
      id: session.id,
      deviceInfo: session.deviceInfo,
      lastActivityAt: session.lastActivityAt,
      isCurrent: session.sessionId === user.sessionId,
    }));
  }

  terminateSession(id: number) {
    return this.deps.UsersRepository.terminateSession(id);
  }

  async updateTranslationPreferences(userId: number, payload: UpdateUserTranslationPreferences) {
    const user = await throwIfNotFound(this.deps.UsersRepository.findByUserIdWithPassword(userId));

    const data = await throwIfNotFound(
      this.deps.UsersRepository.update(user.id, {
        translationPreferences: payload,
      }),
    );

    return {
      userId: data.id,
    };
  }

  async updatePassword(userId: number, payload: UpdateUserPasswordInput) {
    const user = await throwIfNotFound(this.deps.UsersRepository.findByUserIdWithPassword(userId));

    const isPasswordCorrect = await compare(payload.actualPassword, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException({ message: 'Incorrect actual password' });
    }

    const hashedPassword = await hash(payload.newPassword, 10);

    const data = await throwIfNotFound(
      this.deps.UsersRepository.update(user.id, {
        password: hashedPassword,
      }),
    );

    return {
      userId: data.id,
    };
  }

  getUserTranslationPreferences(userId: number) {
    return throwIfNotFound(this.deps.UsersRepository.getTranslationPreferences(userId));
  }

  getDisplayData(userId: number) {
    return throwIfNotFound(this.deps.UsersRepository.getDisplayData(userId));
  }
}
