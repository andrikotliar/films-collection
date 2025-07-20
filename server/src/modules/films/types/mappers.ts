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

type GropedPerson = Pick<Person, 'id' | 'name'> &
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
    award: Pick<Award, 'id' | 'title'>;
    nominations: Array<Pick<Nomination, 'title'> & GroupedNomination>;
  };
};

export type AdminFilmWithRelations = Prisma.FilmGetPayload<{
  select: {
    title: true;
    type: true;
    style: true;
    poster: true;
    rating: true;
    draft: true;
    budget: true;
    boxOffice: true;
    duration: true;
    releaseDate: true;
    description: true;
    chapterKey: true;
    chapterOrder: true;
    genres: {
      select: {
        genreId: true;
      };
    };
    countries: {
      select: {
        countryId: true;
      };
    };
    studios: {
      select: {
        studioId: true;
      };
    };
    collections: {
      select: {
        collectionId: true;
      };
    };
    trailers: {
      select: {
        videoId: true;
        order: true;
      };
    };
    crew: {
      select: {
        personId: true;
        person: {
          select: {
            name: true;
          };
        };
        position: true;
        comment: true;
      };
    };
    cast: {
      select: {
        personId: true;
        person: {
          select: {
            name: true;
          };
        };
      };
    };
    awards: {
      select: {
        awardId: true;
        nominationId: true;
        person: true;
        comment: true;
      };
    };
  };
}>;
