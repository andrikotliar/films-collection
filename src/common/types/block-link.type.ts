type BlockLinkType = {
  property: string;
  value: any;
  suffix?: string;
  variant?: 'clouds' | 'ocean' | 'desert' | 'sky' | 'mars';
};

type LinkGroup = BlockLinkType & {
  title: string;
};

export type { BlockLinkType, LinkGroup };
