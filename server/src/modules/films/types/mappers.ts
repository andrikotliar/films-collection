import {
  Award,
  FilmAwardNomination,
  FilmPerson,
  Nomination,
  Person,
  PersonRole,
  Prisma,
} from '@prisma/client';

export type FilmWithRelations = Prisma.FilmGetPayload<{
  select: {
    id: true;
    title: true;
    releaseDate: true;
    description: true;
    duration: true;
    budget: true;
    boxOffice: true;
    rating: true;
    chapterKey: true;
    type: true;
    genres: {
      select: {
        genre: true;
      };
    };
    countries: {
      select: {
        country: true;
      };
    };
    studios: {
      select: {
        studio: true;
      };
    };
    seriesExtension: {
      select: {
        episodesTotal: true;
        seasonsTotal: true;
        finishedAt: true;
      };
    };
    castAndCrew: {
      select: {
        role: true;
        details: true;
        comment: true;
        person: {
          select: {
            id: true;
            name: true;
            image: true;
          };
        };
      };
    };
    awards: {
      select: {
        award: {
          select: {
            id: true;
            title: true;
            image: true;
          };
        };
        nomination: {
          select: {
            id: true;
            title: true;
          };
        };
        comment: true;
        person: {
          select: {
            id: true;
            name: true;
          };
        };
      };
    };
    collections: {
      select: {
        collection: {
          select: {
            id: true;
            title: true;
          };
        };
      };
    };
    trailers: true;
  };
}>;

type GropedPerson = Pick<Person, 'id' | 'name' | 'image'> &
  Pick<FilmPerson, 'comment' | 'details'>;

export type GroupedPeople = {
  [position in PersonRole]: {
    role: PersonRole;
    people: GropedPerson[];
  };
};

export type GroupedNomination = Pick<FilmAwardNomination, 'comment'> & {
  person: Pick<Person, 'id' | 'name'> | null;
};

export type GroupedAwards = {
  [awardId: number]: {
    award: Pick<Award, 'id' | 'title' | 'image'>;
    nominations: Array<Pick<Nomination, 'title'> & GroupedNomination>;
  };
};
