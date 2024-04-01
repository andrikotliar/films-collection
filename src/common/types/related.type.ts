type RelatedItem = {
  id: string;
  title: string;
};

type Related = {
  [id: string]: {
    chapters: RelatedItem[];
    remakes?: RelatedItem[];
    originals?: RelatedItem[];
  };
};

export type { Related, RelatedItem };
