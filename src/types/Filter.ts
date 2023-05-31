type Filter = {
  type: string;
  title: string;
  property: string;
  options: (string | number)[];
  defaultOptionTitle?: string;
  radio?: boolean;
}

export type { Filter }