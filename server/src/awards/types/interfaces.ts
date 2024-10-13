import { Award } from './award';

interface IAwardsService {
  getAwardsBaseData(id: string[]): Promise<Omit<Award, 'nominations'>[]>;
}

export { IAwardsService };
