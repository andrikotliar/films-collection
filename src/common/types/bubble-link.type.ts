type BubbleLinkType = {
  property: string;
  value: any;
  suffix?: string;
  color?: 'primary' | 'secondary' | 'extra' | 'red';
};

type LinkGroup = BubbleLinkType & {
  title: string;
};

export type { BubbleLinkType, LinkGroup };
