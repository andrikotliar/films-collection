export type FormValues = {
  title: string;
  startDate: number;
  startMonth: number;
  endMonth: number;
  endDate: number;
  description: string | null;
  background: {
    color1: string;
    color2: string;
    angle: string;
  };
  collectionId: number;
  isOneDayEvent: boolean;
  yearFrom: number | null;
};
