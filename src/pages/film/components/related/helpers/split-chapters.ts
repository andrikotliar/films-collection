import { RelatedItem } from '@/common/types';

type ExtendedRelatedItem = RelatedItem & {
  chapter: number;
};

const splitChapters = (index: number, items: ExtendedRelatedItem[]) => {
  const prequels = items.slice(0, index);
  const sequels = items.slice(index + 1);

  return { prequels, sequels };
};

export { splitChapters };
