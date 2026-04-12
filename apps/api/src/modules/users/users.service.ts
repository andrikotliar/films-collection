import type { UserSession } from '~/database/schema';
import {
  BadRequestException,
  NotFoundException,
  throwIfNotFound,
  type Deps,
  type RequestUser,
} from '~/shared';
import crypto from 'node:crypto';
import type { UpdateUserPasswordInput, UserSessionResponse } from '@films-collection/shared';
import { compare, hash } from 'bcrypt';

export class UsersService {
  constructor(private readonly deps: Deps<'usersRepository' | 'jwtService'>) {}

  getUser(userId: number) {
    return this.deps.usersRepository.findById(userId);
  }

  async getUserByUsername(username: string) {
    return this.deps.usersRepository.findByUsernameWithPassword(username);
  }

  async setRefreshToken(userId: number, sessionId: string, token: string | null) {
    const now = new Date();
    return this.deps.usersRepository.updateSession(userId, sessionId, {
      refreshToken: token,
      lastActivityAt: now.toISOString(),
    });
  }

  async getUserSession(userId: number, sessionId: string) {
    return this.deps.usersRepository.getUserSession(userId, sessionId);
  }

  async createUserSession(payload: Pick<UserSession, 'deviceInfo' | 'refreshToken' | 'userId'>) {
    const now = new Date();
    return throwIfNotFound(
      this.deps.usersRepository.createSession({
        ...payload,
        sessionId: crypto.randomUUID(),
        lastActivityAt: now.toISOString(),
      }),
    );
  }

  deleteSession(sessionId: string) {
    return this.deps.usersRepository.removeSession(sessionId);
  }

  async getUserSessions(user: RequestUser): Promise<UserSessionResponse[]> {
    const sessions = await this.deps.usersRepository.getSessions(user.id);

    return sessions.map((session) => ({
      id: session.id,
      deviceInfo: session.deviceInfo,
      lastActivityAt: session.lastActivityAt,
      isCurrent: session.sessionId === user.sessionId,
    }));
  }

  terminateSession(id: number) {
    return this.deps.usersRepository.terminateSession(id);
  }

  async updatePassword(userId: number, payload: UpdateUserPasswordInput) {
    const user = await this.deps.usersRepository.findByUserIdWithPassword(userId);

    if (!user) {
      throw new NotFoundException({ message: 'Error finding user to update data' });
    }

    const isPasswordCorrect = await compare(payload.actualPassword, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException({ message: 'Incorrect actual password' });
    }

    const hashedPassword = await hash(payload.newPassword, 10);

    const data = await throwIfNotFound(
      this.deps.usersRepository.update(user.id, {
        password: hashedPassword,
      }),
    );

    return {
      userId: data.id,
    };
  }
}
