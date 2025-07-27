import type { BackgroundData } from '@/components';

export type FormValues = {
  title: string;
  startDate: number;
  startMonth: number;
  endMonth: number;
  endDate: number;
  description: string | null;
  background: BackgroundData;
  collectionId: number;
  isOneDayEvent: boolean;
  yearFrom: number | null;
};
