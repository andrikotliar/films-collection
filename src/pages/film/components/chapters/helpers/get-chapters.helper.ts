import { FilmData } from '@/common/types';

const getChapters = (data: FilmData[], chaptersTitle: string) => {
  return data
    .filter((film) => {
      if (film?.chapters) {
        return film.chapters.title === chaptersTitle;
      }
    })
    .sort((a, b) =>
      Number(a.chapters?.part) > Number(b.chapters?.part) ? 1 : -1,
    );
};

export { getChapters };
