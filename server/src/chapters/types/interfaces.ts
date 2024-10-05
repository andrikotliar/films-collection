import { Chapter } from './chapter';

interface IChaptersService {
  findChapters(chapterId: string): Promise<Chapter | null>;
}

export { IChaptersService };
