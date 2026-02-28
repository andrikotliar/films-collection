import { type Deps } from '~/shared';

export class UsersService {
  constructor(private readonly deps: Deps<'usersRepository'>) {}

  getUser(userId: number) {
    return this.deps.usersRepository.findById(userId);
  }

  async getUserByUsername(username: string) {
    return this.deps.usersRepository.findByUsernameWithPassword(username);
  }

  async setRefreshToken(id: number, token: string | null) {
    return this.deps.usersRepository.updateById(id, {
      refreshToken: token,
    });
  }
}
