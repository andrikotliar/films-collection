export type Filter = {
  title: string;
  property: string;
  options: (string | number)[];
  defaultOptionTitle?: string;
  isRadio?: true;
  isScrollable?: true;
  isGrid?: true;
};
