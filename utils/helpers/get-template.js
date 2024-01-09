const baseTemplate = {
  id: '',
  title: '',
  type: [],
  genres: [],
  year: 2024,
  summary: {
    sections: [
      {
        text: '',
      },
    ],
  },
  media: [
    {
      poster: '',
      trailer: '',
    },
  ],
  crew: [
    {
      role: 'Directed by',
      people: [
        {
          name: '',
        },
      ],
    },
    {
      role: 'Written by',
      people: [
        {
          name: '',
        },
      ],
    },
    {
      role: 'Produced by',
      people: [
        {
          name: '',
        },
      ],
    },
    {
      role: 'Music by',
      people: [
        {
          name: '',
        },
      ],
    },
    {
      role: 'Cinematography by',
      people: [
        {
          name: '',
        },
      ],
    },
  ],
  cast: [
    {
      actorId: '',
      name: '',
      character: {
        name: '',
        imageUrl: null,
      },
    },
  ],
  countries: ['USA'],
  production: [],
  collections: [
    {
      title: '',
    },
  ],
  budget: 0,
  boxOffice: 0,
  duration: 0,
  awards: [
    {
      title: '',
      nominations: [],
    },
  ],
  chapters: {
    title: '',
    part: 0,
  },
};

const DEFAULT_SEASON = 'Season 1';

const seriesDetails = {
  episodesTotal: 0,
  seasons: [
    {
      number: 1,
      episodesCount: 0,
      year: 2024,
    },
  ],
};

const getTemplate = (type) => {
  const template = { ...baseTemplate };

  if (type.includes('Series')) {
    template.series = seriesDetails;
    template.media[0].caption = DEFAULT_SEASON;
    template.summary.sections[0].title = DEFAULT_SEASON;
    template.crew[0].people[0].comment = '';
  }

  return template;
};

export { getTemplate };
