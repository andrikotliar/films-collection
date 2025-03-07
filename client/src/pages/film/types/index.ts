import { ReactNode } from 'react';

export type SummaryConfig = {
  id: string;
  title: string;
  content: ReactNode;
  isHidden?: boolean;
};
