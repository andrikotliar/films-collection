const baseFilmProperties = {
  type: {
    type: 'string',
  },
  style: {
    type: 'string',
  },
  title: {
    type: 'string',
  },
  poster: {
    type: 'string',
  },
  releaseDate: {
    type: 'string',
  },
  publishStatus: {
    type: 'string',
  },
  chapterIds: {
    type: 'string',
  },
  duration: {
    type: 'number',
  },
  rating: {
    type: 'number',
  },
  watchCount: {
    type: 'number',
  },
  budget: {
    type: 'number',
  },
  boxOffice: {
    type: 'number',
  },
  genres: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
  studios: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
  countries: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
  trailers: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
  crew: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        role: {
          type: 'string',
        },
        people: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              comment: {
                type: ['string', 'null'],
              },
            },
            required: ['name'],
          },
        },
      },
      required: ['role', 'people'],
    },
  },
  description: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        title: {
          type: ['string', 'null'],
        },
        text: {
          type: 'string',
        },
      },
      required: ['text'],
    },
  },
  cast: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        actor: {
          type: 'string',
        },
        character: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            imageUrl: {
              type: ['string', 'null'],
            },
          },
          required: ['name'],
        },
      },
      required: ['actor', 'character'],
    },
  },
  collections: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        collection: {
          type: 'string',
        },
        order: {
          type: 'number',
        },
      },
      required: ['collection'],
    },
  },
  awards: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        award: {
          type: 'string',
        },
        nominations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
              },
              actor: {
                type: 'string',
              },
              comment: {
                type: 'string',
              },
            },
            required: ['title'],
          },
        },
      },
      required: ['award', 'nominations'],
    },
  },
  seriesExtension: {
    anyOf: [
      {
        type: 'object',
        properties: {
          episodesTotal: {
            type: 'number',
          },
          seasons: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                number: {
                  type: 'number',
                },
                episodesCount: {
                  type: 'number',
                },
                releaseDate: {
                  type: 'string',
                },
              },
              required: ['number', 'episodesCount', 'releaseDate'],
            },
          },
        },
        required: ['episodesTotal', 'seasons'],
      },
      {
        type: 'null',
      },
    ],
  },
};

export const updateFilmPayloadSchema = {
  body: {
    type: 'object',
    properties: baseFilmProperties,
    additionalProperties: false,
  },
};

export const createFilmPayloadSchema = {
  body: {
    type: 'object',
    properties: baseFilmProperties,
    required: ['title', 'type', 'style'],
    additionalProperties: false,
  },
};
