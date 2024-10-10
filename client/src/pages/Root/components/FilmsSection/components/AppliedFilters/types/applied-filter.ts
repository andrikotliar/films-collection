import { combinedTitles } from '@/titles/combined-titles';

type AppliedFilter = {
  key: string;
  value: keyof typeof combinedTitles;
};

export type { AppliedFilter };
