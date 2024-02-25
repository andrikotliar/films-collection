import { ReactNode } from 'react';

type DataLinkType = {
  property: string;
  value: any;
  suffix?: string;
};

type LinkGroup = DataLinkType & {
  title: string;
};

export type { DataLinkType, LinkGroup };
