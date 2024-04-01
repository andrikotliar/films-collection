type RelatedItem = {
  id: string;
  title: string;
  poster: string;
};

type Related = {
  [id: string]: {
    chapters: RelatedItem[];
    remakes?: RelatedItem[];
    originals?: RelatedItem[];
  };
};

export type { Related, RelatedItem };
