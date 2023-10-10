import { api } from '@/services';
import { Actor } from '@/common';

export class ActorsAPI {
  static async getAll() {
    const response = await api.get<Actor[]>(
      '/database/actors.json',
    );
    return response.data;
  }
}
