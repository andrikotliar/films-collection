type RelatedItem = {
  id: string;
  title: string;
  poster: string;
};

type RelatedFilms = {
  chapters: RelatedItem[];
  remakes?: RelatedItem[];
  originals?: RelatedItem[];
};

export type { RelatedFilms, RelatedItem };
