import type { UserSession } from '~/database/schema';
import { throwIfNotFound, type Deps } from '~/shared';

export class UsersService {
  constructor(private readonly deps: Deps<'usersRepository'>) {}

  getUser(userId: number) {
    return this.deps.usersRepository.findById(userId);
  }

  async getUserByUsername(username: string) {
    return this.deps.usersRepository.findByUsernameWithPassword(username);
  }

  async setRefreshToken(userId: number, sessionId: string, token: string | null) {
    return this.deps.usersRepository.updateSession(userId, sessionId, {
      refreshToken: token,
    });
  }

  async getUserSession(userId: number, sessionId: string) {
    return this.deps.usersRepository.getUserSession(userId, sessionId);
  }

  async createUserSession(payload: Pick<UserSession, 'deviceInfo' | 'refreshToken' | 'userId'>) {
    return throwIfNotFound(this.deps.usersRepository.createSession(payload));
  }

  deleteSession(userId: number, sessionId: string) {
    return this.deps.usersRepository.removeSession(userId, sessionId);
  }
}
