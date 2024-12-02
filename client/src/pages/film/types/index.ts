import { ReactNode } from 'react';

type SummaryConfig = {
  id: string;
  title: string;
  content: ReactNode;
  isHidden?: boolean;
};

export type { SummaryConfig };
